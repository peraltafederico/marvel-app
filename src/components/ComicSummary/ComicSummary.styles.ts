import styled from 'styled-components'

const color = '#3e3e3e'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 750px;
  margin-bottom: 30px;
`
export const CoverPage = styled.div`
  display: flex;
  flex: 1;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
`

export const Content = styled.div`
  margin-left: 30px;
  flex: 1;
`

export const Title = styled.h1`
  margin: 0 0 50px 0;
  color: ${color};
`

export const ComicInfo = styled.div`
  margin: 50px 0;
  display: flex;
  flex-flow: column;
`

export const Data = styled.span`
  font-size: 20px;
  color: ${color};
  margin-bottom: 2px;
  font-weight: bold;
  opacity: 1;
`

export const Description = styled.p`
  font-size: 21px;
  margin-bottom: 20px;
  line-height: 1.3em;
  color: ${color};

  & ul {
    padding-inline-start: 20px;
  }
`
