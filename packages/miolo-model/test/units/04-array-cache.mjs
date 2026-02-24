import test from 'node:test'
import assert from 'node:assert'
import { FlavourList } from '../models.mjs'

test('MioloArray cache methods', async (t) => {
  await t.test('get_from_cache_or_make functionality', () => {
    const list = new FlavourList([
      { score: 10 },
      { score: 20 }
    ])
    const total = list.getTotalScore()
    assert.strictEqual(total, 30)

    // change underlying data to ensure cache keeps original value
    list[0]._set('score', 100)
    const cachedTotal = list.getTotalScore()
    assert.strictEqual(cachedTotal, 30)
  })

  await t.test('invalidate_cache functionality', () => {
    const list = new FlavourList([
      { score: 10 },
      { score: 20 }
    ])
    list.getTotalScore() // warms cache
    
    list[0]._set('score', 100)
    list.invalidate_cache('total_score') // invalidates right key
    
    const recalculated = list.getTotalScore()
    assert.strictEqual(recalculated, 120)
  })

  await t.test('reset_cache functionality', () => {
    const list = new FlavourList([
      { score: 5 },
      { score: 15 }
    ])
    list.getTotalScore() // warms cache

    list.append({ score: 10 })
    list.reset_cache()
    
    const newTotal = list.getTotalScore()
    assert.strictEqual(newTotal, 30) // 5 + 15 + 10
  })
})
