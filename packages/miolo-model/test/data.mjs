export const FLAVOUR_TYPES = [
  { id: "f1", name: "Trigo Blanco", texture: "Fina", strength: "W100", color: "Blanco" },
  { id: "f2", name: "Trigo Integral", texture: "Gruesa", strength: "W200", color: "Marrón" },
  { id: "f3", name: "Centeno", texture: "Densa", strength: "W150", color: "Grisáceo" },
  { id: "f4", name: "Espelta", texture: "Suave", strength: "W120", color: "Crema" }
]

export const BREAD_TYPES = [
  { id: "b1", name: "Hogaza", weight: 500, cook_time: 45, flavour_type: "f1" },
  { id: "b2", name: "Baguette", weight: 250, cook_time: 25, flavour_type: "f1" },
  { id: "b3", name: "Pan de Molde", weight: 600, cook_time: 40, flavour_type: "f2" },
  { id: "b4", name: "Pan de Centeno", weight: 700, cook_time: 55, flavour_type: "f3" }
]

export const BAKERY_DATA = {
  id: "bak1",
  name: "Horno Loco",
  breads: [BREAD_TYPES[0], BREAD_TYPES[2]]
}
