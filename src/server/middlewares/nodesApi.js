import express from "express"
import selectn from "selectn"
import { Node, Mood, Decision } from '../data/models'
import { mustLogin } from './permissions'
import slugify from 'slug'
import { assignIn as extend } from 'lodash'

function findMoodIdBySlug(slug) { // TODO extend Mood with this function
    return Mood
            .findOne({ where: { slug }})
            // .then(result => selectn('dataValues.id', result))
            .then(result => result.get('id'))
}

// routes
const router = express.Router(); // TODO refactor without "const"?
router
  
  .post('/', mustLogin, function({user, body}, res) {
    console.log('body', body);
    findMoodIdBySlug(body.moodSlug) // TODO use assotiations instead?
      .then(MoodId => { // TODO add comments
        body.MoodId = MoodId
        body.UserId = user.id
        console.log('MoodId insert!', MoodId);
        return Node.create(body)
        // extend(body, { MoodId, UserId: user.id })
      })
      // .then(({ dataValues: node }) => res.json(node))    
      .then(({ dataValues: node }) => console.log('nodeinsert after node', node))    
      .catch(error => Boom.internal(error))  
  })

  .get('/:moodSlug', function({ params }, res) {
    console.log('get moodSlug'), params.moodSlug;
    if (!params.moodSlug) return res.boom.badQuery()
    findMoodIdBySlug(params.moodSlug)
      .then(MoodId => {
        console.log('MoodId in noedapi get', MoodId);
        return Decision.findOne(
          {
            where: {
              // MoodId, // TODO add migration to resolve moodId
              nextViewAt: {
                $lt: new Date()
              },
            },
            // Find all projects with a least one task where task.state === project.task
            include: [{
                model: Node,
                where: { MoodId }
            }]
          }
        )
        // return Node.findOne({ where: { MoodId } })
      })
      .then((result) => {
        const decision = result ? result.dataValues : {}
        console.log('result of searching for decision', decision);
        res.json(result)
      })
      .catch(error => {
        console.error(error);
        res.boom.internal(error)
      })
  })

export default router