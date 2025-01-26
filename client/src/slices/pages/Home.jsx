import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText'

import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'


const Home = () => {
  return (
    <div>
      {/*Section1 */}
      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
      text-white justify-between'>

        <Link to={"/signup"}>
          <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
          transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex flex-row items-center gap-2 rounded-full px-6 md:px-10 py-[5px]
            transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className='text-center text-3xl md:text-4xl font-semibold mt-7'>
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className='mt-4 w-[95%] md:w-[90%] text-center text-sm md:text-lg font-bold text-richblack-300'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className='flex flex-col md:flex-row gap-4 md:gap-7 mt-8'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className='mx-3 my-6 md:my-12 shadow-blue-200 w-full md:w-auto'>
          <video muted loop autoPlay className='w-full md:w-auto'>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <div className='w-full'>
          <CodeBlocks
            position={"flex-col lg:flex-row"}
            heading={
              <div className='text-3xl md:text-4xl font-semibold'>
                Unlock Your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title><link rel="stylesheet" href="styles.css">\n</head>\n`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code Section 2 */}
        <div className='w-full'>
          <CodeBlocks
            position={"flex-col lg:flex-row-reverse"}
            heading={
              <div className='text-3xl md:text-4xl font-semibold'>
                Unlock Your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "https://www.w3schools.com/tryit/",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title><link rel="stylesheet" href="styles.css">\n</head>\n`}
            codeColor={"text-yellow-25"}
          />
        </div>

        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[250px] md:h-[310px]'>
          <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
            <div className='h-[100px] md:h-[150px]'></div>
            <div className='flex flex-col md:flex-row gap-5 md:gap-7 text-white'>
              <CTAButton active={true} linkto={"/catalog/aiml"}>
                <div className='flex items-center gap-3'>
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                Learn more
              </CTAButton>
            </div>
          </div>
        </div>

        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
          <div className='flex flex-col md:flex-row gap-5 mb-10 mt-[70px] md:mt-[95px]'>
            <div className='text-3xl md:text-4xl font-semibold w-full md:w-[45%]'>
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className='flex flex-col gap-6 md:gap-10 w-full md:w-[40%] items-start'>
              <div className='text-sm md:text-[16px]'>
                The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                Learn more
              </CTAButton>
            </div>
          </div>

          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
        <InstructorSection />

        {/* <h2 className='text-center text-3xl md:text-4xl font-semibold mt-10'>
          Reviews from Other Learners
        </h2> */}
        {/* Review Slider */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
