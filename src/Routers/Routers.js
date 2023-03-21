import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Content from '../components/Content'
import Bil from '../pages/Bil'
import Users from '../components/Users/Index'
import Winner from '../pages/Winner'
import Slider from '../pages/Slider'
import Event from '../pages/Event'
import ChangePassword from '../components/ChangePassword'
import CreateUser from '../components/CreateUser'
import CreateEvent from '../components/CreateEvent'
import CreateSlider from '../components/CreateSlider'
import CreatePrize from '../components/CreatePrize'
import CreateCandidate from '../components/CreateCandidate'
import CreatePeriod from '../components/CreatePeriod'
import CreateProvince from '../components/CreateProvince'
import CreateDistrict from '../components/CreateDistrict';
import CreateBil from '../components/CreateBil';
import Page404 from './Page404'
import Random from '../pages/Random';
import WinnerDetail from '../pages/WinnerDetail';
import ReloadRandom from '../pages/reloadPages/ReloadRandom'
import ReloadAbout from '../pages/reloadPages/ReloadAbout'
import ReloadDistrict from '../pages/reloadPages/ReloadDistrict'
import ReloadEvent from '../pages/reloadPages/ReloadEvent'
import ReloadPrize from '../pages/reloadPages/ReloadPrize'
import ReloadProvince from '../pages/reloadPages/ReloadProvince'
import ReloadSlider from '../pages/reloadPages/ReloadSlider'
import ReloadUser from '../pages/reloadPages/ReloadUser'
import Candidates_eligibility from '../pages/Candidate_eligibility';
import ReloadCandidate from '../pages/reloadPages/ReloadCandidate'
import Settime from '../pages/SettingRandomTime'
import ReloadSettime from '../pages/reloadPages/ReloadSettime';
import LuckyDraw from '../components/luckydraw/LuckyDraw'
import Prizes from '../components/Prize/Prizes'
import Index from '../components/City/Index'
import Footer from '../components/Manage-the-home-page/Footer/Footer'
import Form_Footer from '../components/Manage-the-home-page/Footer/Form-Footer'
import Form_edit_footer from '../components/Manage-the-home-page/Footer/Form-edit-footer'
import About from '../components/Manage-the-home-page/About/About'
import Form_about from '../components/Manage-the-home-page/About/Form-about'
import Candidate from '../components/candidate/Candidate'
import Form_candidate from '../components/candidate/Form-candidate'
import Slide from '../components/Manage-the-home-page/Slide/Slide'
import Form_slide from '../components/Manage-the-home-page/Slide/Form-slide'

const Routers = (props) => {
  let role = props.role
  return (
    <div>
      <Routes>
        {/* <Route path='/content' element={<Content />} />
        <Route path='/add-prize' element={<CreatePrize />} />
        <Route path='/' element={<Bil />} />
        <Route path='/add-candidate' element={<CreateCandidate />} />
        <Route path='/add-bil/:id' element={<CreateBil />} />
        <Route path='/winner' element={<Winner />} />
        <Route path='/add-period' element={<CreatePeriod />} />
        <Route path='/slider' element={<Slider />} />
        <Route path='/add-slider' element={<CreateSlider />} />
        <Route path='/event' element={<Event />} />
        <Route path='/add-event' element={<CreateEvent />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/add-user' element={<CreateUser />} />
        <Route path='/add-province' element={<CreateProvince />} />
        <Route path='/add-district' element={<CreateDistrict />} />
        <Route path='/random' element={<Random />} />
        <Route path='/luckydraw' element={<LuckyDraw />} />
        <Route path='/winnerDetail' element={<WinnerDetail />} />
        <Route path='/reloadRandom' element={<ReloadRandom />} />
        <Route path='/reloadAbout' element={<ReloadAbout />} />
        <Route path='/reloadDistrict' element={<ReloadDistrict />} />
        <Route path='/reloadEvent' element={<ReloadEvent />} />
        <Route path='/reloadPrize' element={<ReloadPrize />} />
        <Route path='/reloadProvince' element={<ReloadProvince />} />
        <Route path='/reloadSlider' element={<ReloadSlider />} />
        <Route path='/reloadUser' element={<ReloadUser />} />
        <Route path='/reloadCandidate' element={<ReloadCandidate />} />
        <Route path='/reloadSettime' element={<ReloadSettime />} />
        <Route path='/Candidates_eligibility' element={<Candidates_eligibility />} />
        <Route path='/settime' element={<Settime />} /> */}

        <Route path='/*' element={<Bil />} />

        {/* Footer  */}
        <Route path='/Footer' element={<Footer />} />
        <Route path='/Footer/add-footer' element={<Form_Footer />} />
        <Route path='/Footer/edit-footer' element={<Form_edit_footer />} />

        {/* About  */}
        <Route path='/about' element={<About />} />
        <Route path='/about/add-about' element={<Form_about />} />

        {/* province  */}
        <Route path='/province' element={<Index />} />

        {/* user  */}
        <Route path='/user' element={<Users />} />

        {/* prize  */}
        <Route path='/prize' element={<Prizes />} />

        {/* Candidate  */}
        <Route path='/Candidates_eligibility' element={<Candidate />} />
        <Route path='/add-candidate' element={<Form_candidate />} />

        {/* Slide  */}
        <Route path='/slider' element={<Slide />} />
        <Route path='/slider/add-slide' element={<Form_slide />} />

      </Routes>
    </div>
  )
}

export default Routers