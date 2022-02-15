import {useState, useEffect} from 'react'

export const Home = () => {
  const [baseApi, setBaseApi] = useState({'baseApi':[]})
  const[reposApi, setReposApi] = useState([])
  const [eventsApi, setEventsApi] = useState([])
  const [repoIds, setRepoIds] = useState([])
  const [eventIds, setEventIds] = useState([])
  const [dateVerification, setDateVerification] = useState('')

  const url = "https://api.github.com/orgs/BoomTownROI"
  const repoUrl = url + '/repos'
  const eventsUrl = url + '/events'
  const hooksUrl = url + '/hooks'
  const issuesUrl = url + '/issues'
  const membersUrl = url + '/members{/member}'
  const publicMemUrl = url + '/public_members{/member}'
  
  const getBaseData = async () => {
    try {
      let baseResponse = await fetch(url)
      let baseApi = await baseResponse.json()
      setBaseApi({'baseApi': baseApi})
      // console.log(baseApi)
    } catch (error) {
      console.log('error', error)
    }
  }

  const getReposData = async () => {
    try {
      let repoResponse = await fetch(repoUrl)
      let reposApi = await repoResponse.json()
      setReposApi(reposApi)
      getRepoIds()
    } catch (error) {
      console.log('error', error)
    }
  }

  const getEventsData = async () => {
    try {
      let eventsResponse = await fetch(eventsUrl)
      let eventsApi = await eventsResponse.json()
      setEventsApi(eventsApi)
      getEventIds()
    } catch (error) {
      console.log('error', error)
    }
  }

  const getRepoIds = () => {
    const repoIds = reposApi.map(ids => ids.id)
    setRepoIds(repoIds)
  }

  const getEventIds = () => {
    const eventIds = eventsApi.map(ids => parseInt(ids.id))
    setEventIds(eventIds)
  }

  const verifyDates = () => {
    let originalCreationDate = new Data(baseApi.created_at)
    let updatedDate = new Data(baseApi.updated_at)

    (originalCreationDate < updatedDate) ? true : false
  }

  const failedResponse = async (site) => {
    try {
      const response = await fetch(site);
  
      console.log('status code: ', response.status);
  
      if (!response.ok) {
        console.log(response);
        throw new Error(`Error! status: ${response.status}`);
      }  
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  
  //     // baseApi = Object.entries(baseApi).map((e) => ( { [e[0]]: e[1] } ))
  // ideal world I would turn json object into an array, then create an array that just include the 
  //_url path. then 
  
  useEffect(() => {
    getBaseData()
    getReposData()
    getEventsData()
    // failedResponse(hooksUrl)
    // failedResponse(membersUrl)
    // failedResponse(publicMemUrl)
    // failedResponse(issuesUrl)  
  }, []);


  return(
    <div>
      <p>hello world</p>
      
    </div>
  )
}