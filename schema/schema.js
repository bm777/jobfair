const graphql = require("graphql")

// models here
const Skill = require("../models/skill")
const Job = require("../models/job")
const Contract = require("../models/contract")
const skill = require("../models/skill")


// import types
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLID,
    GraphQLSchema
} = graphql

const SkillType = new GraphQLObjectType({
    name: "Skill",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
})

const ContractType = new GraphQLObjectType({
    name: "Contract",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
})

const JobType = new GraphQLObjectType({
    name: "Job",
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        location: {type: GraphQLString},
        contract: {
            type: ContractType,
            resolve(parent, args){
                return Contract.findById(parent.contractId)
            }
        },
        skills: {
            type: new GraphQLList(SkillType),
            resolve(parent, args){
                return Skill.find({jobId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        // skills
        skills: {
            type: new GraphQLList(SkillType),
            resolve(parent, args){
                return Skill.find({})
            }
        },
        // contracts
        contracts: {
            type: new GraphQLList(ContractType),
            resolve(parent, args){
                return Contract.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        addSkill:{
            type: SkillType,
            args:{
                name: {type: GraphQLString}
            },
            resolve(parent, args){
                let skill = new Skill({
                    name: args.name
                })
                return  skill.save()
            }
        },
        addContract:{
            type: ContractType,
            args:{
                name: {type: GraphQLString}
            },
            resolve(parent, args){
                let contract = new Contract({
                    name: args.name
                })
                return  contract.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
