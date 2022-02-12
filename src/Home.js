export const Home = () => {
  const [error, checkError] = useState('')

  const topLevelFetch = async () => {
    try {
      const response = await fetch('https://api.github.com/orgs/BoomTownROI')
    } catch(error) {
      checkError('Not found')
    } 
  } 
  console.log(topLevelFetch)
}