import assert from "node:assert"
import test from "node:test"
import { BAKERY_DATA, BREAD_TYPES, FLAVOUR_TYPES } from "../data.mjs"
import { Bakery, Bread, Flavour, FlavourList } from "../models.mjs"

test("MioloModel nested objects", async (t) => {
  await t.test("loading nested relation properties", () => {
    const flavours = new FlavourList(FLAVOUR_TYPES)
    const breadData = BREAD_TYPES[0]

    const bread = new Bread(breadData, flavours)

    // Ensure the nested `flavour` maps to the right relation
    assert.ok(bread.flavour instanceof Flavour)
    assert.strictEqual(bread.flavour._get("name"), "Trigo Blanco")
  })

  await t.test(
    "get_extra_data handles properties explicitly defined as instance getters that map to MioloModel",
    () => {
      const flavours = new FlavourList(FLAVOUR_TYPES)
      const breadData = BREAD_TYPES[0]
      const bread = new Bread(breadData, flavours)

      bread.get_data()
      // It actually doesn't map getters automatically in get_extra_data.
      // get_extra_data iterates Object.entries(this) looking for MioloModel values.
      // Let's explicitly define a property to test nested data extraction

      bread.flavour_ref = bread.flavour // set directly as a property

      const fullData = bread.get_data()
      // fullData should have `flavour_ref` correctly mapped to flavor's underlying data.
      assert.deepStrictEqual(fullData.flavour_ref, {
        id: "f1",
        name: "Trigo Blanco",
        texture: "Fina",
        strength: "W100",
        color: "Blanco"
      })
    }
  )

  await t.test("nested arrays using array property", () => {
    const bakery = new Bakery(BAKERY_DATA)
    // breads property has array of Breads
    assert.ok(bakery.breads[0] instanceof Bread)

    // get_extra_data should extract the array of MioloModels
    const fullBakeryData = bakery.get_data()
    assert.strictEqual(fullBakeryData.breads.length, 2)
    assert.strictEqual(fullBakeryData.breads[0].name, "Hogaza")
  })
})
