const mongoose = require('mongoose');


//  schema for the homecasestudytwopage
const homecasestudythreepageSchema = new mongoose.Schema({

  backgroundImageUrl: { type: String, required: true },
  sectionTitle: { type: String, required: true },
  heading: { type: String, required: true },
  categories:  {type: [String],  required: true,},
  description: { type: String, required: true },

CaseStudySolutions: {
    title: {type: String, required: true},
    solutionData: {
      type: Array,
      items: {
        type: Object,
        properties: {
          id: {type: Number,required: true},
          number: {type: String,required: true},
          title: {type: String,required: true},
          contents: {
            type: Array,
            items: {
              type: Object,
              properties: {
                primaryHeading: {type: String,required: false},
                primaryDescription: {type: String,required: false},
                description: {type: String,required: false},
                image: {type: String,required: false}
              }
            }
          },
          points: {
            type: Array,
            items: {type: String},
            required: false}
        }
      }
    }
  },
 Spotlight:{
   spotlightItems:[{
    title: { type: String, required: true },
    description: { type: String, required: true },
    ImageUrl: { type: String, required: true },
   }]
 },

 AiServices:{
  title: { type: String, required: true },
  backgroundVideo: { type: String, required: true },
 },
 transformingEnterprises: {
    title: { type: String, required: true },
    carouselSlides: [{
      id: { type: Number, required: true },
      title: { type: String, required: true },
      image: { type: String, required: true },
      alt: { type: String, required: true }
    }]
  }
}, { collection: 'HomeCaseStudyThreePage' });

// Export the model
module.exports = mongoose.model('HomeCaseStudyThreePage', homecasestudythreepageSchema);