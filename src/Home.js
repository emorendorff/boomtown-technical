import {useState, useEffect} from 'react'

export const Home = () => {
  const [baseApi, setBaseApi] = useState([])
  const[reposApi, setReposApi] = useState([])
  const [eventsApi, setEventsApi] = useState([])
  const [paths, setPaths] = useState([])
  // let url = "https://api.github.com/orgs/BoomTownROI"
  let url = "https://api.github.com/orgs/BoomTownROI"
  const repoUrl = url + '/repos'
  const eventsUrl = url + '/events'
  
  const getAllData = async () => {
    try {
        let baseResponse = await fetch(url)
        let baseApi = await baseResponse.json()
        setBaseApi(baseApi)
        console.log(baseApi)
    } catch (error) {
      console.log('error', error)
    }
  }

  const getReposData = async () => {
    try {
        let repoResponse = await fetch(repoUrl)
        let reposApi = await repoResponse.json()
        setReposApi(reposApi)
        console.log(reposApi)
    } catch (error) {
      console.log('error', error)
    }
  }

  const getEventsData = async () => {
    try {
        let eventsResponse = await fetch(eventsUrl)
        let eventsApi = await eventsResponse.json()
        setEventsApi(eventsApi)
        console.log(eventsApi)
    } catch (error) {
      console.log('error', error)
    }
  }
  
  //     // baseApi = Object.entries(baseApi).map((e) => ( { [e[0]]: e[1] } ))

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch((`https://api.github.com/orgs/BoomTownROI/${paths[i]}`))
  //     checkForError(response)
  //     console.log(response)
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }

  // const checkForError = (response) => {
  //   if (!response.ok) {
  //     const message = `An error has occured: ${response.status}`;
  //     throw new Error(message)
  //   } 
  // }


  // ideal world I would turn json object into an array, then create an array that just include the 
  //_url path. then 
  
  useEffect(() => {
    getAllData()
    getReposData()
    getEventsData()
    // getTopLevelData()
    // fetchPaths()
    // console.log(filterPaths())
    // mapDataUrls()
    // console.log(baseApi)
    // arrayifyData()

  
  }, []);


  return(
    <div>
      <p>hello world</p>
    </div>
  )
}