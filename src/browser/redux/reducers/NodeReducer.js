import isEmpty from 'lodash/isEmpty'
import { Map, List } from 'immutable'

// TODO add immutable
const decisionStructure = Map({
								rating: '',
								UserId: '',
								NodeId: '',
								MoodId: '',
								vote: null,
								NodeRating: '',
								nextViewAt: '',
							})

const nodeStructure = 	Map({
							id: '',
							url: '',
							UserId: '',
							MoodId: '',
							rating: '',
							type: '',
							provider: '',
							contentId: '',
							Decision: decisionStructure.toJS()
						})
const initialState = 	Map({
							error: '',
							loading: false,
							finishedLoading: true,
							dialogIsOpen: false,
							contentNotFound: false,
							searchIsActive: false, // TODO do i need this?
							searchedVideos: List(),
							...nodeStructure.toJS()
						})

export default (state = initialState, {type, payload}) => {
	switch(type) {
		case 'FETCHING_NODE':
			return state.merge({
				loading: true,
				finishedLoading: false,
				contentNotFound: false,
			})
		case 'RECIEVE_NODE':
			return state.mergeDeep({
				...payload,
				loading: false,
				finishedLoading: true,
				contentNotFound: isEmpty(payload),
			})
		case 'UPDATE_NODE':
			return state.mergeDeep(payload)
		case 'TOGGLE_DIALOG':
			return state.set('dialogIsOpen', !state.dialogIsOpen)
		case 'UNLOAD_NODE':
			return state.mergeDeep({
				...nodeStructure,
				loading: false,
				finishedLoading: false,
				contentNotFound: false,
			})
		case 'RECIEVE_SEARCHED_VIDEOS':
			return state.merge({
				searchIsActive: false,
				searchedVideos: payload
			})
		default:
			return state
	}
}