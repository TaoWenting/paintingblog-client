import React from 'react';
import PaintingListScreen from './components/PaintingListScreen';
import VideoPlayer from './components/VideoScreen'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import PaintingDetailScreen from './components/PaintingDetailScreen';
import AnimatedSwitch from './components/AnimatedSwitch';


const App: React.FC = () => (


<BrowserRouter>
    <AnimatedSwitch>
      <Route exact path="/Player" component={VideoPlayer} />
      <Route exact path="/paintings" component={PaintingListScreen} />
      <Route
        exact
        path="/paintings/:paintingId"
        component={({
          match,
          history,
        }: RouteComponentProps<{ paintingId: string }>) => (
          <PaintingDetailScreen paintingId={match.params.paintingId} history={history} />
        )}
      />      
    </AnimatedSwitch>
    <Route exact path="/" render={redirectToPaintings} />
  </BrowserRouter>
);

const redirectToPaintings = () => <Redirect to="/paintings"/>;

export default App;
