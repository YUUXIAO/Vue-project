// 搜索区域
import SearchInputItem from '@/components/Search/s-input'
import SearchSelectItem from '@/components/Search/s-select'
import SearchRadioItem from '@/components/Search/s-radio'
import SearchDaterangeItem from '@/components/Search/s-daterange'
import ToolBar from '@/components/Search/toolbar'


// 表格
import CommonTable from '@/components/CommonTable'

export const searchInputItem = {
    install: function (Vue) {
        Vue.component('search-input-item', SearchInputItem)
    }
}

export const searchSelectItem = {
    install: function (Vue) {
        Vue.component('search-select-item', SearchSelectItem)
    }
}

export const searchRadioItem = {
    install: function (Vue) {
        Vue.component('search-radio-item', SearchRadioItem)
    }
}

export const searchDaterangeItem = {
    install: function (Vue) {
        Vue.component('search-daterange-item', SearchDaterangeItem)
    }
}

export const toolBar = {
    install: function (Vue) {
        Vue.component('tool-bar', ToolBar)
    }
}

export const commonTable = {
    install: function (Vue) {
        Vue.component('c-table', CommonTable)
    }
}
