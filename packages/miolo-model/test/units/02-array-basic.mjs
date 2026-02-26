import assert from "node:assert"
import test from "node:test"
import { FLAVOUR_TYPES } from "../data.mjs"
import { EmptyList, Flavour, FlavourList } from "../models.mjs"

test("MioloArray basic methods", async (t) => {
  await t.test("constructor basic", () => {
    const list = new FlavourList(FLAVOUR_TYPES)
    assert.strictEqual(list.length, FLAVOUR_TYPES.length)
    assert.ok(list[0] instanceof Flavour)
    assert.strictEqual(list[0].data.name, "Trigo Blanco")
  })

  await t.test("constructor length init", () => {
    const list = new FlavourList(5)
    assert.strictEqual(list.length, 5)
  })

  await t.test("constructor with empty itemClass", () => {
    const emptyList = new EmptyList()
    assert.strictEqual(emptyList.itemClass, undefined)
  })

  await t.test("last", () => {
    const list = new FlavourList(FLAVOUR_TYPES)
    const lastItem = list.last()
    assert.strictEqual(lastItem.data.name, "Espelta")
  })

  await t.test("get_data", () => {
    const list = new FlavourList(FLAVOUR_TYPES)
    const data = list.get_data()
    assert.strictEqual(Array.isArray(data), true)
    assert.deepStrictEqual(data, FLAVOUR_TYPES)
  })

  await t.test("find_index_by_field", () => {
    const list = new FlavourList(FLAVOUR_TYPES)
    const index = list.find_index_by_field("id", "f3")
    assert.strictEqual(index, 2)

    const notFound = list.find_index_by_field("id", "nope")
    assert.strictEqual(notFound, -1)
  })

  await t.test("find_by_field", () => {
    const list = new FlavourList(FLAVOUR_TYPES)
    const item = list.find_by_field("texture", "Densa")
    assert.ok(item !== undefined)
    assert.strictEqual(item.data.name, "Centeno")

    const notFound = list.find_by_field("texture", "Blanda")
    assert.strictEqual(notFound, undefined)
  })

  await t.test("find_by_id", () => {
    const list = new FlavourList(FLAVOUR_TYPES)
    const item = list.find_by_id("f2")
    assert.ok(item !== undefined)
    assert.strictEqual(item.data.name, "Trigo Integral")
  })

  await t.test("remove_by_field", () => {
    const list = new FlavourList(FLAVOUR_TYPES)
    list.remove_by_field("id", "f2")
    assert.strictEqual(list.length, 3)
    assert.strictEqual(list.find_by_id("f2"), undefined)

    // Ensure it doesn't fail on nonexistent element
    list.remove_by_field("id", "unknown")
    assert.strictEqual(list.length, 3)
  })

  await t.test("append", () => {
    const list = new FlavourList(FLAVOUR_TYPES)
    const newItem = list.append({
      id: "f5",
      name: "Avena",
      texture: "Fina",
      strength: "W80",
      color: "Crema Opaco"
    })
    assert.ok(newItem instanceof Flavour)
    assert.strictEqual(list.length, 5)
    assert.strictEqual(list.last().data.name, "Avena")
  })
})
