import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppProvider, Navigation, Router, Branding } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import logo from '../logo.jpg';
import User from './user/UserPage';
import Setting from '../components/SettingPage';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'user',
    title: 'User',
    icon: <PeopleIcon />,
  },
  {
    segment: 'setting',
    title: 'Setting',
    icon: <SettingsIcon />,
  },
  {
    kind: 'divider',
  }
];

const BRANDING: Branding =
  {
    title: 'CMSSI APIS',
    homeUrl : '/user',
    logo:  <img src={logo} alt="logo"/>
  };


const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}


export default function Main(props: any) {
  const { window } = props;

  const router = useDemoRouter('/user');
function Page(props: any) {
  if (props.route === '/user') {
    return <User/>;
  }
    if (props.route === '/setting') {
      return <Setting/>;
    }
  return <User/>;
}
  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={BRANDING}
    >
      <DashboardLayout>
        <PageContainer>
            <Page route={router}/>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
