import {useState, useEffect} from 'react'
import './home.css'

export const Home = () => {
// Hooks to set all state in app

  const [baseApi, setBaseApi] = useState([])
  const[reposApi, setReposApi] = useState([])
  const [eventsApi, setEventsApi] = useState([])
  const [repoIds, setRepoIds] = useState([])
  const [eventIds, setEventIds] = useState([])
  const [dateVerification, setDateVerification] = useState(false)
  const [repoVerfication, setRepoVerification] = useState(false)
  const [selectId, setSelectId] = useState(false)

// Global variables
  const url = "https://api.github.com/orgs/BoomTownROI"
  const repoUrl = url + '/repos'
  const eventsUrl = url + '/events'
  const hooksUrl = url + '/hooks'
  const issuesUrl = url + '/issues'
  const membersUrl = url + '/members{/member}'
  const publicMemUrl = url + '/public_members{/member}'
  
  // Access top level api
  const getBaseData = async () => {
    try {
      let baseResponse = await fetch(url)
      let baseApi = await baseResponse.json()
      setBaseApi(baseApi)
      verifyDates()
      verifyRepoCount()
    } catch (error) {
      console.log('error', error)
    }
  }

// Access repos level api
  const getReposData = async () => {
    try {
      let repoResponse = await fetch(repoUrl)
      let reposApi = await repoResponse.json()
      setReposApi(reposApi)
    } catch (error) {
      console.log('error', error)
    }
  }

// Access events level api
  const getEventsData = async () => {
    try {
      let eventsResponse = await fetch(eventsUrl)
      let eventsApi = await eventsResponse.json()
      setEventsApi(eventsApi)
    } catch (error) {
      console.log('error', error)
    }
  }

// Iterate over repo api and map ids and set state 
  const getRepoIds = () => {
    const repoIds = reposApi.map(ids => ids.id)
    setRepoIds(repoIds)
  }

// Iterate over events api and map ids and set state
  const getEventIds = () => {
    const eventIds = eventsApi.map(ids => parseInt(ids.id))
    setEventIds(eventIds)
  }

// Create 404 errors in console for failed urls
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


  const verifyDates = () => {
  // Format creation and updated date to compare
    let originalCreationDate = new Date(baseApi.created_at)
    let updatedDate = new Date(baseApi.updated_at)
  // Create conditional and set state if original creation date is before the updated date
    if (originalCreationDate < updatedDate) {
      setDateVerification(true)
    }
  }

  const verifyRepoCount = () => {
    let topLevelRepoCount = baseApi.public_repos
    let reposCount = reposApi.length
  // Create conditional and set state if public_repos and repos api array length are equal
    if (topLevelRepoCount === reposCount) {
      setRepoVerification(true)
    } 
  }

  // Click handler for repo button
  const handleRepoClick = () => {
      setSelectId(true)
      getRepoIds()
  }

 // Click handler for events button
  const handleEventsClick = () => {
    setSelectId(true)
    getEventIds()
  }

  
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
    <section className='home-container'>
      <div className='btn-flex'>
        <button className='btn' onClick={handleRepoClick}><span>See Repo IDs</span></button>
        <button className='btn' onClick={handleEventsClick}><span>See Event IDs</span></button>
      </div>
      <div className='id-formating'>
        {selectId && repoIds && <ul className='ids-display'>{repoIds.map(repo => (<li key={repo}><span>Repo ID:</span>{repo}</li>))}</ul> }
        {selectId && eventIds && <ul className='ids-display'>{eventIds.map(evt => (<li key={evt}><span>Event Repo ID:</span> {evt}</li>))}</ul>}
      </div>
      <div className='verify'>
        <h2>Date Verification</h2>
        {dateVerification && <p>Updated at date <span className='good'>later</span> than created at date.</p>}
        {!dateVerification && <p>Update at date <span className='alert'>earlier</span> than created at date</p>}
        <h2>Repo Verification</h2>
        {repoVerfication && <p>Repo counts match!</p>}
        {!repoVerfication && <p>Repo counts don't match!</p>}
      </div>
    </section>
  )
}