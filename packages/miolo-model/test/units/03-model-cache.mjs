import assert from "node:assert"
import test from "node:test"
import { Flavour } from "../models.mjs"

test("MioloModel cache methods", async (t) => {
  await t.test("get_from_cache_or_make functionality", () => {
    const model = new Flavour({ id: "1", strength: "W100" })
    const score1 = model.getStrengthScore()
    assert.strictEqual(score1, 200)

    // Manually modify data to test cache returns old value
    model.data.strength = "W200"
    const scoreCached = model.getStrengthScore()
    assert.strictEqual(scoreCached, 200) // still 200 because cached
  })

  await t.test("invalidate_cache functionality", () => {
    const model = new Flavour({ id: "1", strength: "W100" })
    model.getStrengthScore() // loads cache

    // change underneath and invalidate
    model.data.strength = "W200"
    model.invalidate_cache("strength_score")

    const score2 = model.getStrengthScore()
    assert.strictEqual(score2, 400) // re-calculated
  })

  await t.test("reset_cache functionality", () => {
    const model = new Flavour({ id: "1", strength: "W100" })
    model.getStrengthScore()

    // change underneath and reset all cache
    model.data.strength = "W300"
    model.reset_cache()

    const score3 = model.getStrengthScore()
    assert.strictEqual(score3, 600)
  })
})
