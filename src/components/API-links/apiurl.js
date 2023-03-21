export default {
    // Mainurl: "http://bestech.la/random-api/",
    // Mainurl: "http://localhost:8080/",
    Mainurl: "http://127.0.0.1:8000/",
    file: "http://bestech.la/images/",
    
    // User API
    createUser : "api/v1/auth/users",
    loginedUser: 'api/v1/login',
    getUser: "api/v1/auth/user",
    getSingleUser: "api/v1/user/",
    updateUser: 'api/v1/auth/user/',
    deleteUser: "api/v1/auth/user/",
    logout: "api/v1/logout",
    Changpasword: 'api/v1/change/12345-6789-00000-Luckydraw-Web-Med',

    // Event API
    createEvent: 'api/v1/event',
    getEvent: 'api/v1/event',
    getsingleEvent: 'api/v1/event/',
    updateEvent: 'api/v1/event/',
    deleteEvent: 'api/v1/event/',
    patchEvent: 'api/v1/event/',


    // Candidates API
    getCandidate: 'api/candidates/v1',
    postCandidate: 'api/candidates/v1',
    putCandidate : 'api/candidates/v1/',
    deleteCandidate: 'api/candidates/v1/',
    getCandidateID: 'api/candidates/v1/',

    // Prize API
    createPrize: 'api/prizes/v1',
    getPrize: 'api/v1/prize',
    getSinglePrize: 'api/prizes/v1/id/',
    updatePrize: 'api/prizes/v1/',
    patchprice: 'api/v1/prize/',
    deletePrize: 'api/prizes/v1/',

    // Periods API
    createPeriod: 'api/v1/times',
    getPeriod: 'api/v1/times',
    getPeriodV2: 'api/v2/times',

    // Winner API
    getWinner: 'api/winners/v1',
    getWinnerV2: 'api/winners/v1/randomV2',
    postWinner: 'api/winners/v1/',
    getPhoneWinner: 'api/winners/v1/',

    // Banner API
    createBanner: 'api/v1/banner',
    getBanner: 'api/v1/banner',
    updateBanner: 'api/v1/banner/',
    deleteBanner: 'api/v1/banner/',
    patchBanner: 'api/v1/banner/',

    //About API
    getAbout: 'api/v1/about',
    postAbout: 'api/v1/about',
    putAbout: 'api/v1/about/',
    patchAbout: 'api/v1/about/',

    //Province API
    getProvince: 'api/province/getallprovince',
    postProvince: 'api/province/addprovince',
    putProvince: 'api/province/update/',
    deleteProvince: 'api/province/delete/',
    getProvinceAndDistrictID : 'api/province/getprovincedistrict/',

    //District API
    getDistrict: 'api/district/getalldistrict',
    getByIDistrice: 'api/district/',
    postDistrict: 'api/district/adddistrict/',
    putDistrict: 'api/district/update/',
    deleteDistrict: 'api/district/delete/',

    //Bils API
    postBil: 'api/bils/v1',
    getBil: 'api/bils/v1',
    getBilID: 'api/bils/v1',
    patchbils: 'api/bils/v1/',
    deletebils: 'api/bils/v1/',

    //Random API
    getRandom: 'api/winners/v1/random',

    //Week API
    getWeek: 'api/v1/week',
    postWeek: 'api/v1/week',
    putWeek: 'api/v1/week',
    deleteWeek: 'api/v1/week',
    getWeekID: 'api/v1/week/',

    //Draw Date API
    getDrawDateList: 'api/v1/draw-date',
    postDrawDate: 'api/v1/draw-date',
    getDrawDateID: 'api/v1/draw-date/',
    patchDrawDate: 'api/v1/draw-date/',
    getLatestDrawDate: 'api/v1/draw-date/latest',
    deleteDrawDate: 'api/v1/draw-date/',
    putDrawDate: 'api/v1/draw-date/',

    //Week API
    postWeek: 'api/v1/week',
    getLatestWeek: 'api/v1/week/latest',

    //sheet API
    getSheet: 'api/v1/sheet',
    postSheet: 'api/v1/sheet',

    // Footer
    GETFOOTER: 'api/v1/footer',
    POSTFOOTER: 'api/v1/footer',
    PATCHFOOTER: 'api/v1/footer/',
}