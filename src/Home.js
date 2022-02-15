import {useState, useEffect} from 'react'

export const Home = () => {
  const [baseApi, setBaseApi] = useState([])
  const[reposApi, setReposApi] = useState([])
  const [eventsApi, setEventsApi] = useState([])
  const [repoIds, setRepoIds] = useState([])
  const [eventIds, setEventIds] = useState([])
  const [dateVerification, setDateVerification] = useState(false)
  const [repoVerfication, setRepoVerification] = useState(false)
  const [selectId, setSelectId] = useState(false)

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
      setBaseApi(baseApi)
      verifyDates()
      verifyRepoCount()
    } catch (error) {
      console.log('error', error)
    }
  }

  const getReposData = async () => {
    try {
      let repoResponse = await fetch(repoUrl)
      let reposApi = await repoResponse.json()
      setReposApi(reposApi)
      // handleClick()
      // getRepoIds()
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
    let originalCreationDate = new Date(baseApi.created_at)
    let updatedDate = new Date(baseApi.updated_at)
    if (originalCreationDate < updatedDate) {
      setDateVerification(true)
    }
  }

  const verifyRepoCount = () => {
    let topLevelRepoCount = baseApi.public_repos
    let reposCount = reposApi.length
    if (topLevelRepoCount === reposCount) {
      setRepoVerification(true)
    } 
  }


  const handleClick = (event) => {
      setSelectId(true)
      getRepoIds()
  }

  // const handleEvents

  
  useEffect(() => {
    getBaseData()
    getReposData()
    getEventsData()
    // failedResponse(hooksUrl)
    // failedResponse(membersUrl)
    // failedResponse(publicMemUrl)
    // failedResponse(issuesUrl)  
  }, [baseApi]);

  return(
    <section>
      <h1>BoomTown Technical Assessment</h1>
      <div className='btn-flex'>
        <button className='btn' onClick={handleClick}>See Repo IDs</button>
        <button className='btn'>See Event IDs</button>
      </div>
      <div>
      {selectId && repoIds && 
        <ul className='repoIds'>
          {repoIds.map(repo => (<li key={repo}>{repo}</li>))}</ul> }
      </div>
      <div className='verify'>
        {dateVerification && <p>Updated at date later than created at date.</p>}
        {!dateVerification && <p>Update at date earlier than created at date</p>}
      </div>
      <div>
        {repoVerfication && <p>Repo counts match!</p>}
        {!repoVerfication && <p>Repo counts don't match!</p>}
      </div>
    </section>
  )
}