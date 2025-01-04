import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"

const LearningLanguageSection = () => {
  return (
    <div className='mt-[50px] md:mt-[130px] mb-16 md:mb-32'>
      <div className='flex flex-col gap-5 items-center'>
        <div className='text-2xl md:text-4xl font-semibold text-center'>
          Your Swiss Knife for
          <HighlightText text={" learning any language"} />
        </div>

        <div className='text-center text-richblack-600 mx-auto text-sm md:text-base font-medium w-[90%] md:w-[70%]'>
          Using spin making learning multiple languages easy. With 20+ languages, realistic voice-over, progress tracking, custom schedule, and more.
        </div>

        <div className='flex flex-col md:flex-row items-center justify-center mt-5 gap-5 md:gap-0'>
          <img 
            src={know_your_progress}
            alt="Know Your Progress"
            className='object-contain w-[80%] md:w-auto -mr-0 md:-mr-32'
          />
          <img 
            src={compare_with_others}
            alt="Compare With Others"
            className='object-contain w-[80%] md:w-auto'
          />
          <img 
            src={plan_your_lesson}
            alt="Plan Your Lesson"
            className='object-contain w-[80%] md:w-auto -ml-0 md:-ml-36'
          />
        </div>

        <div className='w-fit mt-5 md:mt-0'>
          <CTAButton active={true} linkto={"/signup"}>
            <div>
              Learn more
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
