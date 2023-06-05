const {buildSchema} = require('graphql')

const schema = buildSchema(`
		type User {
			id: ID
			username: String
			age: Int
			order: [Order]
		}
		
		type Product {
			id: ID
			title: String
			price: Int
			quantity: Int
			description: String
		}
		
		input UserInput {
			id: ID
			username: String!
			age: Int!
			order: [OrderInput]
		}
		
		input ProductInput {
			id: ID
			title: String!
			price: Int!
			quantity: Int!
			description: String!
		}
		
		type Order { 
			id: ID!  userId: ID!
			products: [Product]  
			total: Float!  
			date: String!  
			status: String!
  	}
  	
  	input OrderInput {
  		id: ID
  		userId: ID!
			products: [ProductInput] 
			total: Float  
			date: String!  
			status: String!
  	}
		
		type Query {
			getAllUsers: [User]
			getUser(id: ID): User
			getAllProduct: [Product]
			getProduct(id: ID): Product
			getOrder(id: ID!): Order
		}
		
		type Mutation {
			 createUser(input: UserInput): User
			 addProduct(input: ProductInput): Product 
			 addOrder(input: OrderInput): Order  
		}
`)

module.exports = schema
