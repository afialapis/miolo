import fs from "node:fs"
import path from "node:path"

const modelsDir = path.join(process.cwd(), "src/ns/models")
fs.mkdirSync(modelsDir, { recursive: true })

const schemas = {
  Competition: ["id", "name", "type"],
  Team: ["id", "fifa_id", "name", "shortname", "logo", "country"],
  Player: [
    "id",
    "fifa_id",
    "id_team",
    "name",
    "shortname",
    "logo",
    "position",
    "shirt_number",
    "captain"
  ],
  Stadium: ["id", "fifa_id", "name", "capacity", "city", "country"],
  Stage: ["id", "fifa_id", "id_season", "name", "ordinal", "start_date", "end_date"],
  Match: ["id", "fifa_id", "id_stage", "id_stadium", "start_date"],
  MatchTeam: ["id", "id_match", "id_team", "home", "score"],
  MatchPlayer: ["id", "id_match_team", "id_player", "goals", "assists", "yellow_cards", "red_card"],
  MatchSub: ["id", "id_match_team", "id_match_player_in", "id_match_player_out", "minute"],
  Lobby: ["id", "hash", "name", "logo", "mode", "created_at"],
  LobbyPayment: ["id", "id_lobby", "pmethod", "currency", "amount", "paid_at", "created_at"],
  LobbyPlayer: ["id", "id_lobby", "id_account", "admin", "name", "shortname", "logo", "created_at"],
  Prediction: [
    "id",
    "id_lobby_player",
    "id_team_champion",
    "id_team_runnerup",
    "id_team_breakout",
    "id_player_mvp",
    "id_player_top_scorer",
    "id_player_top_assister",
    "id_player_best_youngster",
    "id_player_best_goalkeeper",
    "id_player_best_goal",
    "created_at"
  ],
  PredictionMatch: [
    "id",
    "id_prediction",
    "id_match",
    "pool_result",
    "score_h",
    "score_a",
    "id_player_mvp",
    "id_player_first_scorer",
    "created_at"
  ]
}

function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (m, letter) => letter.toUpperCase())
}

for (const [modelName, fields] of Object.entries(schemas)) {
  const getters = fields
    .map((f) => `  get ${snakeToCamel(f)}() {\n    return this._get("${f}")\n  }`)
    .join("\n")

  const modelCode = `import { MioloModel } from "miolo-model"

export default class ${modelName} extends MioloModel {
  constructor(data) {
    super(data)
  }

${getters}
}
`

  const listCode = `import { MioloArray } from "miolo-model"
import ${modelName} from "./${modelName}.mjs"

export default class ${modelName}List extends MioloArray {
  constructor(data) {
    super(${modelName}, data)
  }
}
`

  fs.writeFileSync(path.join(modelsDir, `${modelName}.mjs`), modelCode)
  fs.writeFileSync(path.join(modelsDir, `${modelName}List.mjs`), listCode)
  console.log(`Created ${modelName}.mjs and ${modelName}List.mjs`)
}
