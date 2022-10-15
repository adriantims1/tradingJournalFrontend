// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'trades',
    path: '/dashboard/trade',
    icon: getIcon('eva:trending-up-fill'),
  },
  {
    title: 'news',
    path: '/dashboard/news',
    icon: getIcon('eva:globe-2-fill'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  { title: 'algorithm', path: '/dashboard/algorithm', icon: getIcon('eva:shake-fill') },
];

export default navConfig;
