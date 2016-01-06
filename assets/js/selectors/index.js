import { createSelector, createStructuredSelector } from 'reselect'

// const providersSelector = state => state.providers
// const providersSelectedSelector = state => state.selectedProvider

const connectionsSelector = state => state.connections
export const connectionsSelectedSelector = state => state.selectedConnection

const entitiesStatsSelector = state => state.entities.stats

const torrentsItemsSelector = state => state.torrents.items
const torrentsSelectedSelector = state => state.selectedTorrent.item
const entitiesTorrentsSelector = state => state.entities.torrents

export const visibleTorrentsSelector = createSelector(
  torrentsItemsSelector,
  entitiesTorrentsSelector,
  (items, entities) => items ? items.map(i => entities[i]) : []
)

export const selectedTorrentSelector = createSelector(
  torrentsSelectedSelector,
  entitiesTorrentsSelector,
  (selected, entities) => selected ? entities[selected] : {}
)

export const bodySelector = createStructuredSelector({
  torrents: visibleTorrentsSelector,
  selectedTorrent: selectedTorrentSelector,
  connectionsSelected: connectionsSelectedSelector
})

export const selectedConnectionSelector = createSelector(
  connectionsSelectedSelector,
  connectionsSelector,
  (selected, entities) => selected ? entities[selected] : {}
)

export const modalSelector = state => state.modal

export const statsSelector = createSelector(
  selectedConnectionSelector,
  entitiesStatsSelector,
  (selected, entities) => (selected && selected.nameIdentifier && entities) ? entities[selected.nameIdentifier] : {}
)

export const appSelector = createStructuredSelector({
  modal: modalSelector,
  selectedConnection: selectedConnectionSelector,
  selectedTorrent: selectedTorrentSelector,
  stats: statsSelector
})

export const footerSelector = createStructuredSelector({
  stats: statsSelector
})

export const headerSelector = createStructuredSelector({
  connections: connectionsSelector,
  connectionsSelected: connectionsSelectedSelector
})
