import assert from "node:assert"
import test from "node:test"
import { FLAVOUR_TYPES } from "../data.mjs"
import { Flavour } from "../models.mjs"

test("MioloModel basic methods", async (t) => {
  const flavourData = FLAVOUR_TYPES[0]

  await t.test("constructor", () => {
    const flavour = new Flavour(flavourData)
    assert.deepStrictEqual(flavour.data, flavourData)
  })

  await t.test("_get", () => {
    const flavour = new Flavour(flavourData)
    assert.strictEqual(flavour._get("name"), "Trigo Blanco")
    assert.strictEqual(flavour._get("non_existent", "default_value"), "default_value")
  })

  await t.test("_set", () => {
    const flavour = new Flavour({ ...flavourData })
    flavour._set("name", "Trigo Especial")
    assert.strictEqual(flavour._get("name"), "Trigo Especial")

    // test _set on empty object
    const emptyModel = new Flavour()
    emptyModel._set("new_prop", 123)
    assert.strictEqual(emptyModel._get("new_prop"), 123)
  })

  await t.test("get_extra_data (empty by default on basic model)", () => {
    const flavour = new Flavour(flavourData)
    assert.deepStrictEqual(flavour.get_extra_data(), {})
  })

  await t.test("get_data", () => {
    const flavour = new Flavour(flavourData)
    assert.deepStrictEqual(flavour.get_data(), flavourData)
  })

  await t.test("update", () => {
    const flavour = new Flavour({ ...flavourData })
    flavour.update({
      strength: "W150",
      color: "Gris"
    })

    assert.strictEqual(flavour._get("strength"), "W150")
    assert.strictEqual(flavour._get("color"), "Gris")

    // ensure old untouched fields are intact
    assert.strictEqual(flavour._get("name"), "Trigo Blanco")

    // update when data is undefined
    const emptyModel = new Flavour()
    emptyModel.update({ test: "val" })
    assert.strictEqual(emptyModel._get("test"), "val")
  })
})
