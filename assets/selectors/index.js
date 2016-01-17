import { createSelector, createStructuredSelector } from 'reselect'

// const providersSelector = state => state.providers
// const providersSelectedSelector = state => state.selectedProvider

const connectionsSelector = state => state.connections
export const connectionsSelectedSelector = state => state.selectedConnection

const entitiesStatsSelector = state => state.entities.stats

export const torrentsItemsSelector = state => state.torrents.items
export const torrentsItemsSortedSelector = state => state.torrents.itemsSorted
export const torrentsItemsFilteredSelector = state => state.torrents.itemsFiltered
export const torrentsIsSortedSelector = state => state.torrents.isSorted
export const torrentsIsFilteredSelector = state => state.torrents.isFiltered
export const torrentsSortCriteriaSelector = state => state.torrents.sortedBy
export const torrentsFilterCriteriaSelector = state => state.torrents.filteredByValue
export const torrentsFilterFieldSelector = state => state.torrents.filteredByField
export const torrentsIsSortedByDescendingSelector = state => state.torrents.isSortedByDescending
const torrentsSelectedSelector = state => state.selectedTorrent.item
export const entitiesTorrentsSelector = state => state.entities.torrents
export const torrentsToUploadItemsSelector = state => state.torrentsToUpload.items

export const addTorrentsModalSelector = createStructuredSelector({
  torrents: torrentsToUploadItemsSelector
})

export const visibleTorrentsSelector = createSelector(
  torrentsItemsSelector,
  torrentsItemsSortedSelector,
  torrentsSortCriteriaSelector,
  torrentsIsSortedByDescendingSelector,
  torrentsFilterCriteriaSelector,
  torrentsItemsFilteredSelector,
  entitiesTorrentsSelector,
  torrentsIsSortedSelector,
  torrentsIsFilteredSelector,
  (items, itemsSorted, sortedBy, isSortedByDescending, filteredBy, itemsFiltered, entities, isSorted, isFiltered) => {
    if (isSorted) {
      items = itemsSorted
    }

    if (isFiltered) {
      items = itemsFiltered
    }

    return items ? items.map(i => entities[i]) : []
  }
)

export const selectedTorrentSelector = createSelector(
  torrentsSelectedSelector,
  entitiesTorrentsSelector,
  (selected, entities) => selected ? entities[selected] : {}
)

export const bodySelector = createStructuredSelector({
  torrents: visibleTorrentsSelector,
  torrentsIsSorted: torrentsIsSortedSelector,
  torrentsIsSortedByDescending: torrentsIsSortedByDescendingSelector,
  torrentsIsFiltered: torrentsIsFilteredSelector,
  torrentsFilteredBy: torrentsFilterCriteriaSelector,
  torrentsSortedBy: torrentsSortCriteriaSelector,
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
  (selected, entities) => (selected && selected.config && selected.config.name && entities) ? entities[selected.nameIdentifier] : {}
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
