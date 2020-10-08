import Vue from "vue";
import Vuex from "vuex";
import * as types from './mutation-types'
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex);

// initial state
  export default new Vuex.Store({
		state: {
			added: [],
			products: [
				{
					id: 1,
					name: 'Sledgehammer',
					price: 125.75,
				},
				{
					id: 2,
					name: 'Axe',
					price: 190.5,
				},
				{
					id: 3,
					name: 'Bandsaw',
					price: 562.13,
				},
				{ id: 4, name: 'Chisel', price: 12.9 },
				{
					id: 5,
					name: 'Hacksaw',
					price: 18.45,
				},
			],
		},

		// getters
		getters: {
			allProducts: (state) => state.products, // would need action/mutation if data fetched async
			getNumberOfProducts: (state) =>
				state.products ? state.products.length : 0,
			cartProducts: (state) => {
				return state.added.map(({ id, quantity }) => {
					const product = state.products.find((p) => p.id === id)

					return {
						name: product.name,
						price: product.price,
						quantity,
					}
				})
			},
		},

		// actions
		actions: {
			addToCart({ commit }, product) {
				commit(types.ADD_TO_CART, {
					id: product.id,
				})
			},
			// removeFromCart({ commit }, product) {
			// 	commit(types.REMOVE_FROM_CART, {
			// 		id: product.id,
			// 	})
			// },
			removeFromCart(context, index) {
				context.commit(types.REMOVE_FROM_CART, index)
			},
		},

		// mutations
		mutations: {
			[types.ADD_TO_CART](state, { id }) {
				const record = state.added.find((p) => p.id === id)

				if (!record) {
					state.added.push({
						id,
						quantity: 1,
					})
				} else {
					record.quantity++
				}
			},

			[types.REMOVE_FROM_CART](state, index) {
				state.added.splice(index, 1)
			},
		},
		modules: {},
		plugins: [new VuexPersistence().plugin],
	})





