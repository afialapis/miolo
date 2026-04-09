import assert from "node:assert"
import test from "node:test"
import { FlavourList } from "../models.mjs"

test("MioloArray cache methods", async (t) => {
  await t.test("get_from_cache_or_make functionality", () => {
    const list = new FlavourList([{ strength: "W10" }, { strength: "W20" }])
    const total = list.getTotalScore()
    assert.strictEqual(total, 60)

    // change underlying data to ensure cache keeps original value
    list[0]._set("strength", "W100")
    const cachedTotal = list.getTotalScore()
    assert.strictEqual(cachedTotal, 60)
  })

  await t.test("invalidate_cache functionality", () => {
    const list = new FlavourList([{ strength: "W10" }, { strength: "W20" }])
    list.getTotalScore() // warms cache

    list[0]._set("strength", "W100")
    list[0].resetStrengthScore()
    list.resetTotalScore()

    const recalculated = list.getTotalScore()
    assert.strictEqual(recalculated, 240)
  })

  await t.test("reset_cache functionality", () => {
    const list = new FlavourList([{ strength: "W5" }, { strength: "W15" }])
    list.getTotalScore() // warms cache

    list.push({ strength: "W10" })
    list.reset_cache()

    const newTotal = list.getTotalScore()
    assert.strictEqual(newTotal, 60)
  })
})
