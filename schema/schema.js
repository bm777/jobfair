const graphql = require("graphql")

// models here
const Skill = require("../models/skill")
const Job = require("../models/job")
const Contract = require("../models/contract")
const skill = require("../models/skill")
const Company = require("../models/company")


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

const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        headquarter: {type: GraphQLString},
        market: {type: GraphQLString}
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
                return Skill.find({_id: parent.skillId})
            }
        },
        company: {
            type: CompanyType,
            resolve(parent, args){
                return Company.findById(parent.companyId)
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
        },
        // skills
        jobs: {
            type: new GraphQLList(JobType),
            resolve(parent, args){
                return Job.find({})
            }
        },
        jobsByTitle: {
            type: new GraphQLList(JobType),
            args: {title: {type: GraphQLString}},
            resolve(parent, args){
                // let tmp = Job.find({title: args.title}, (err, docs) =>{
                //     // console.log(docs)
                //     if (err) return err
                // })
                return Job.find({title: args.title})
            }
        },
        jobsByType: {
            type: new GraphQLList(JobType),
            args: {contract: {type: GraphQLString}},
            resolve(parent, args){
                return Job.find({contractId: args.contract})
            }
        },
        jobsBySkill: {
            type: new GraphQLList(JobType),
            args: {skill: {type: GraphQLString}},
            resolve(parent, args){
                return Job.find({skillId: args.skill})
            }
        },
        jobsByLocation: {
            type: new GraphQLList(JobType),
            args: {location: {type: GraphQLString}},
            resolve(parent, args){
                return Job.find({location: args.location})
            }
        },
        jobsByMarket: {
            type: new GraphQLList(JobType),
            args: {
                market: {type: GraphQLString}
            },
            resolve(parent, args){
                let tmp_market = Company.findOne({market: args.market})

                 return Job.find({companyId: tmp_market.id})
            }
        },
        jobsByCompany: {
            type: new GraphQLList(JobType),
            args: {company: {type: GraphQLString}},
            resolve(parent, args){
                return Job.find({companyId: args.company})
            }
        },
        // companies
        companies: {
            type: new GraphQLList(CompanyType),
            resolve(parent, args){
                return Company.find({})
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
        },
        addJob:{
            type: JobType,
            args:{
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                location: {type: GraphQLString},
                contractId: {type: GraphQLID},
                skillId: {type: GraphQLID},
                companyId: {type: GraphQLString}
            },
            resolve(parent, args){
                let job = new Job({
                    title: args.title,
                    description: args.description,
                    location: args.location,
                    contractId: args.contractId,
                    skillId: args.skillId,
                    companyId: args.companyId
                })
                return  job.save()
            }
        },
        updateJob:{
            type: JobType,
            args:{
                id: {type: GraphQLID},
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                location: {type: GraphQLString},
                contractId: {type: GraphQLID},
                skillId: {type: GraphQLID},
                companyId: {type: GraphQLString}
            },
            resolve(parent, args){
                const filter = {
                    _id: args.id
                }
                const update = {
                    title: args.title,
                    description: args.description,
                    location: args.location,
                    contractId: args.contractId,
                    skillId: args.skillId,
                    companyId: args.companyId
                }
                let job = new Job.findOneAndUpdate(filter, update)
                return  job.save()
            }
        },
        deleteJob:{
            type: JobType,
            args:{
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                const filter = {
                    _id: args.id
                }
                let job = new Job.findOneAndDelete(filter)
                return  job.save()
            }
        },
        addCompany:{
            type: CompanyType,
            args:{
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                headquarter: {type: GraphQLString},
                market: {type: GraphQLString}
            },
            resolve(parent, args){
                let company = new Company({
                    name: args.name,
                    description: args.description,
                    headquarter: args.headquarter,
                    market: args.market
                })
                return  company.save()
            }
        }
    }
    
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
