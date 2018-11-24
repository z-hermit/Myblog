import { combineReducers } from 'redux'
import detailData from './detail_data'
import sceneList from './scene_list'
import pageState from './page_state'

export default combineReducers({
	detailData,
	sceneList,
	pageState
})