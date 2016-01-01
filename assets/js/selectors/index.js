import { createSelector, createStructuredSelector } from 'reselect'

const entitiesControllersSelector = state => state.entities.controllers
const controllersSelectedSelector = state => state.selectedController

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
  selectedTorrent: selectedTorrentSelector
})

export const selectedControllerSelector = createSelector(
  controllersSelectedSelector,
  entitiesControllersSelector,
  (selected, entities) => selected ? entities[selected] : {}
)

export const modalSelector = state => state.modal

export const appSelector = createStructuredSelector({
  modal: modalSelector,
  selectedController: selectedControllerSelector
})

export const statsSelector = createSelector(
  controllersSelectedSelector,
  entitiesStatsSelector,
  (selected, entities) => (selected && entities) ? entities[selected] : {}
)

export const footerSelector = createStructuredSelector({
  stats: statsSelector
})
