import styled from '@emotion/styled';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs';
import MovieCast from './MovieCast';
export default function MovieBody({cast}) {
  return (
    <div css={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div css={{
        width: 'var(--content-width)'
      }}>
        <Tabs>
          <StyledTabList>
            <StyledTab>Cast </StyledTab>
            <StyledTab> Reviews </StyledTab>
            <StyledTab> Related </StyledTab>
          </StyledTabList>
          <TabPanels css={{marginTop: '2rem'}}>
            <TabPanel>
              <MovieCast cast={cast} />
            </TabPanel>
            <TabPanel>
              Reviews
            </TabPanel>
            <TabPanel>
              Related
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}

const StyledTab = styled(Tab)({
  flexBasis: '100%',
  padding: '1rem 0',
  fontSize: 'var(--h4)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--primary-color)',
})

const StyledTabList = styled(TabList)({
  display: 'flex',
  [`${StyledTab}:not(:last-child)`]: {
    borderRight: '1px solid var(--border-color)'
  }
})

