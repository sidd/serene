import { Schema, arrayOf } from 'normalizr'

const torrentSchema = new Schema('torrents', {
  idAttribute: 'infohash'
})

const controllerSchema = new Schema('controllers', {
  idAttribute: 'name'
})

const statsSchema = new Schema('stats', {
  idAttribute: 'provider'
})

export const Schemas = {
  TORRENT_ARRAY: arrayOf(torrentSchema),
  TORRENT: torrentSchema,
  CONTROLLER: controllerSchema,
  CONTROLLER_ARRAY: arrayOf(controllerSchema),
  STATS: statsSchema
}
