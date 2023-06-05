const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');

const PORT = 4111

const products = [
	{id: 1, description: 'Описание продукта', title: 'Samsung', quantity: 5, price: 100},
	{id: 2, description: 'Описание продукта', title: 'Lenovo', quantity: 5, price: 50},
	{id: 3, description: 'Описание продукта', title: 'IPhone', quantity: 5, price: 120}
]

const orders = [
	{
		id: 1, userId: 1,
		products: [],
		total: 0,
		date: '',
		status: 'order'
	}
]

const users = [{id: 1, username: "Ivan", age: 22}]

const createUser = (input) => {
	const id = Date.now()
	return {id, ...input}
}

const root = {
	getAllUsers: () => {
		return users
	},
	getUser: ({id}) => {
		return users.find(user => user.id === id)
	},
	createUser: ({input}) => {
		const user = createUser(input)
		users.push(user)
		return user
	},
	getAllProduct: () => {
		return products
	},
	getProduct: ({id}) => {
		return products.find(product => product.id === id)
	},
	addOrder: ({order}) => {
		return orders.push(order)
	},
	addProduct: ({input}) => {
		return products.push(input)
	}
}

const app = express();

app.use('/graphql', graphqlHTTP({
	schema: schema, graphiql: true, rootValue: root
}));

const server = app.listen(PORT, () => {
	console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
});


module.exports = server;