import { Schema, arrayOf } from 'normalizr'

/**
 * Schema for Torrent entities.
 * Keyed on `infohash`.
 */
const torrentSchema = new Schema('torrents', {
  idAttribute: 'infohash'
})

/**
 * Schema for stats entities.
 * Keyed on `provider`; every provider must provide this field
 * within its metadata.
 */
const statsSchema = new Schema('stats', {
  idAttribute: 'provider'
})

export const Schemas = {
  TORRENT_ARRAY: arrayOf(torrentSchema),
  TORRENT: torrentSchema,
  STATS: statsSchema
}
