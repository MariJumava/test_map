import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import geoData from './floor.json'
import { MapContainer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Pagination } from './Pagination'

const StyledWrap = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledList = styled.div`
  margin: 20px;
`;

export const App = () => {
  const page_len = 3
  const [people, setPeople] = useState([])
  const [currenctPage, setCurrentPage] = useState(1)
  const [numPages, setNumPages] = useState()

  const fetchPeople = useCallback(async () => {
    const response = await fetch(
      `https://213.184.245.66:5010/api/get_all_people?page=${currenctPage}&page_len=${page_len}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${btoa('admin:123456').toString('base64')}`,
        },
      },
    )
    const data = await response.json()
    setPeople(data.data.people)
    setNumPages(data.data.numPages)
  }, [currenctPage])

  useEffect(() => {
    fetchPeople()
  }, [fetchPeople])

  useEffect(() => {
    fetchPeople()
  }, [currenctPage, fetchPeople])

  return (
    <StyledWrap>
      <StyledList>
        People:
        <ul>
          {people.map((item, index) => {
            return <li key={index}>
              <div>
                <img src={`https://213.184.245.66:5010${item.image_ref}`}/>
              {`${item.name ?? ''} ${item.midname ?? ''} ${item.surname ?? ''}`}
              </div>
            </li>
          })}
        </ul>
        {numPages > 1 ? (
          <Pagination
            numPages={numPages}
            currentPage={currenctPage}
            onNext={() => {
              setCurrentPage(currenctPage + 1)
            }}
            onLast={() => {
              setCurrentPage(numPages)
            }}
            onFirst={() => {
              setCurrentPage(1)
            }}
            onPrev={() => {
              setCurrentPage(currenctPage - 1)
            }}
          />
        ) : null}
      </StyledList>
      <MapContainer
        style={{ height: '100vh', width: '80vh' }}
        zoom={20}
        center={[53.91687819154794, 27.63435423374176]}
      >
        <GeoJSON data={geoData.features} />
      </MapContainer>
    </StyledWrap>
  )
}