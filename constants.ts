
import { Pack, Entity, Platform } from './types';

export const ENTITIES: Entity[] = ['ECM4', 'ECM7', 'ECM10'];

export const RDP_SERVERS: string[] = [
  '144.126.129.103', '144.126.130.165', '144.91.119.93', '154.53.51.40',
  '161.97.145.244', '161.97.158.158', '178.18.246.243', '178.18.246.248',
  '185.193.66.147', '185.216.75.117', '194.163.130.102', '194.163.144.27',
  '194.163.145.187', '207.244.243.33', '5.39.222.70', '66.94.120.85',
  '66.94.123.3', '70.36.107.56'
];

export const RDP_CONFIGS: Record<string, { capacity: string }> = {
  '144.126.129.103': { capacity: '1.74 TB' },
  '144.126.130.165': { capacity: '1.17 TB' },
  '144.91.119.93': { capacity: '3.63 TB' },
  '154.53.51.40': { capacity: '1.74 TB' },
  '161.97.145.244': { capacity: '931 GB' },
  '161.97.158.158': { capacity: '931 GB' },
  '178.18.246.243': { capacity: '931 GB' },
  '178.18.246.248': { capacity: '931 GB' },
  '185.193.66.147': { capacity: '1.81 TB' },
  '185.216.75.117': { capacity: '1.81 TB' },
  '194.163.130.102': { capacity: '1.81 TB' },
  '194.163.144.27': { capacity: '1.74 TB / 931 GB' },
  '194.163.145.187': { capacity: '1.81 TB' },
  '207.244.243.33': { capacity: '1.53 TB / 292 GB' },
  '5.39.222.70': { capacity: '1.74 TB' },
  '66.94.120.85': { capacity: '1.81 TB' },
  '66.94.123.3': { capacity: '1.53 TB / 292 GB' },
  '70.36.107.56': { capacity: '1.70 TB' }
};

export const MOCK_PACKS: Pack[] = [
  // ECM4
  { id: 'p1', name: 'Pack17', entity: 'ECM4', rdpServer: '144.126.129.103', platform: 'iMACROS', previous: { total: 2332, ok: 369, notOk: 1963 }, current: { total: 2334, ok: 673, notOk: 1661 } },
  { id: 'p2', name: 'Pack20', entity: 'ECM4', rdpServer: '144.126.129.103', platform: 'iMACROS', previous: { total: 917, ok: 422, notOk: 495 }, current: { total: 995, ok: 481, notOk: 514 } },
  { id: 'p3', name: 'Pack14', entity: 'ECM4', rdpServer: '144.126.130.165', platform: 'iMACROS', previous: { total: 1711, ok: 774, notOk: 937 }, current: { total: 1711, ok: 948, notOk: 763 } },
  { id: 'p4', name: 'Pack16', entity: 'ECM4', rdpServer: '144.126.130.165', platform: 'iMACROS', previous: { total: 1711, ok: 873, notOk: 838 }, current: { total: 1711, ok: 948, notOk: 763 } },
  { id: 'p5', name: 'Pack19', entity: 'ECM4', rdpServer: '144.126.130.165', platform: 'iMACROS', previous: { total: 1711, ok: 1007, notOk: 704 }, current: { total: 1711, ok: 948, notOk: 763 } },
  { id: 'p6', name: 'Pack21', entity: 'ECM4', rdpServer: '144.126.130.165', platform: 'iMACROS', previous: { total: 1713, ok: 975, notOk: 738 }, current: { total: 1713, ok: 948, notOk: 765 } },
  { id: 'p7', name: 'Pack2', entity: 'ECM4', rdpServer: '185.216.75.117', platform: 'ECM_APP', previous: { total: 5000, ok: 1885, notOk: 3115 }, current: { total: 5000, ok: 1885, notOk: 3115 } },
  { id: 'p8', name: 'Pack4', entity: 'ECM4', rdpServer: '194.163.130.102', platform: 'ECM_APP', previous: { total: 3000, ok: 1480, notOk: 1520 }, current: { total: 3000, ok: 1480, notOk: 1520 } },
  { id: 'p9', name: 'Pack1', entity: 'ECM4', rdpServer: '194.163.144.27', platform: 'ECM_APP', previous: { total: 3999, ok: 1367, notOk: 2632 }, current: { total: 3999, ok: 1367, notOk: 2632 } },
  { id: 'p10', name: 'Pack15', entity: 'ECM4', rdpServer: '194.163.144.27', platform: 'iMACROS', previous: { total: 1914, ok: 907, notOk: 1007 }, current: { total: 1917, ok: 895, notOk: 1022 } },
  { id: 'p11', name: 'Pack3', entity: 'ECM4', rdpServer: '66.94.120.85', platform: 'ECM_APP', previous: { total: 3078, ok: 145, notOk: 2933 }, current: { total: 3078, ok: 159, notOk: 2919 } },

  // ECM7
  { id: 'p12', name: 'Pack75', entity: 'ECM7', rdpServer: '144.91.119.93', platform: 'iMACROS', previous: { total: 4320, ok: 985, notOk: 3335 }, current: { total: 4892, ok: 1097, notOk: 3795 } },
  { id: 'p13', name: 'Pack76', entity: 'ECM7', rdpServer: '144.91.119.93', platform: 'iMACROS', previous: { total: 4320, ok: 983, notOk: 3337 }, current: { total: 4892, ok: 1097, notOk: 3795 } },
  { id: 'p14', name: 'Pack77', entity: 'ECM7', rdpServer: '194.163.145.187', platform: 'iMACROS', previous: { total: 2924, ok: 28, notOk: 2896 }, current: { total: 2924, ok: 238, notOk: 2686 } },
  { id: 'p15', name: 'Pack79', entity: 'ECM7', rdpServer: '194.163.145.187', platform: 'iMACROS', previous: { total: 1896, ok: 1, notOk: 1895 }, current: { total: 1896, ok: 734, notOk: 1162 } },
  { id: 'p16', name: 'Pack71', entity: 'ECM7', rdpServer: '207.244.243.33', platform: 'iMACROS', previous: { total: 1861, ok: 958, notOk: 903 }, current: { total: 1680, ok: 913, notOk: 767 } },
  { id: 'p17', name: 'Pack72', entity: 'ECM7', rdpServer: '207.244.243.33', platform: 'iMACROS', previous: { total: 1861, ok: 885, notOk: 976 }, current: { total: 1681, ok: 913, notOk: 768 } },
  { id: 'p18', name: 'Pack73', entity: 'ECM7', rdpServer: '66.94.123.3', platform: 'iMACROS', previous: { total: 1319, ok: 326, notOk: 993 }, current: { total: 932, ok: 440, notOk: 492 } },
  { id: 'p19', name: 'Pack110', entity: 'ECM7', rdpServer: '66.94.123.3', platform: 'iMACROS', previous: { total: 1320, ok: 326, notOk: 994 }, current: { total: 933, ok: 440, notOk: 493 } },

  // ECM10
  { id: 'p20', name: 'Pack96', entity: 'ECM10', rdpServer: '154.53.51.40', platform: 'iMACROS', previous: { total: 5487, ok: 638, notOk: 4849 }, current: { total: 1297, ok: 637, notOk: 660 } },
  { id: 'p21', name: 'Pack97', entity: 'ECM10', rdpServer: '154.53.51.40', platform: 'iMACROS', previous: { total: 5578, ok: 1258, notOk: 4320 }, current: { total: 1438, ok: 1252, notOk: 186 } },
  { id: 'p22', name: 'Pack108', entity: 'ECM10', rdpServer: '161.97.145.244', platform: 'iMACROS', previous: { total: 7200, ok: 2223, notOk: 4977 }, current: { total: 2609, ok: 2221, notOk: 388 } },
  { id: 'p23', name: 'Pack109', entity: 'ECM10', rdpServer: '161.97.145.244', platform: 'iMACROS', previous: { total: 3600, ok: 1614, notOk: 1986 }, current: { total: 1846, ok: 1559, notOk: 287 } },
  { id: 'p24', name: 'Pack106', entity: 'ECM10', rdpServer: '161.97.158.158', platform: 'iMACROS', previous: { total: 7200, ok: 2084, notOk: 5116 }, current: { total: 2701, ok: 2082, notOk: 619 } },
  { id: 'p25', name: 'Pack107', entity: 'ECM10', rdpServer: '161.97.158.158', platform: 'iMACROS', previous: { total: 3600, ok: 1521, notOk: 2079 }, current: { total: 1749, ok: 1516, notOk: 233 } },
  { id: 'p26', name: 'Pack104', entity: 'ECM10', rdpServer: '178.18.246.243', platform: 'iMACROS', previous: { total: 7200, ok: 1471, notOk: 5729 }, current: { total: 2648, ok: 1447, notOk: 1201 } },
  { id: 'p27', name: 'Pack105', entity: 'ECM10', rdpServer: '178.18.246.243', platform: 'iMACROS', previous: { total: 3600, ok: 1407, notOk: 2193 }, current: { total: 1756, ok: 1404, notOk: 352 } },
  { id: 'p28', name: 'Pack98', entity: 'ECM10', rdpServer: '178.18.246.248', platform: 'iMACROS', previous: { total: 7200, ok: 1552, notOk: 5648 }, current: { total: 2396, ok: 1551, notOk: 845 } },
  { id: 'p29', name: 'Pack99', entity: 'ECM10', rdpServer: '178.18.246.248', platform: 'iMACROS', previous: { total: 3600, ok: 1533, notOk: 2067 }, current: { total: 1844, ok: 1490, notOk: 354 } },
  { id: 'p30', name: 'Pack94', entity: 'ECM10', rdpServer: '185.193.66.147', platform: 'iMACROS', previous: { total: 5797, ok: 655, notOk: 5142 }, current: { total: 1953, ok: 785, notOk: 1168 } },
  { id: 'p31', name: 'Pack95', entity: 'ECM10', rdpServer: '185.193.66.147', platform: 'iMACROS', previous: { total: 2878, ok: 1936, notOk: 942 }, current: { total: 2058, ok: 1370, notOk: 688 } },
  { id: 'p32', name: 'Pack91', entity: 'ECM10', rdpServer: '5.39.222.70', platform: 'iMACROS', previous: { total: 2910, ok: 945, notOk: 1965 }, current: { total: 1567, ok: 939, notOk: 628 } },
  { id: 'p33', name: 'Pack92', entity: 'ECM10', rdpServer: '5.39.222.70', platform: 'iMACROS', previous: { total: 2916, ok: 1637, notOk: 1279 }, current: { total: 1940, ok: 1729, notOk: 211 } },
  { id: 'p34', name: 'Pack93', entity: 'ECM10', rdpServer: '5.39.222.70', platform: 'iMACROS', previous: { total: 2001, ok: 552, notOk: 1449 }, current: { total: 1083, ok: 550, notOk: 533 } },
  { id: 'p35', name: 'Pack80', entity: 'ECM10', rdpServer: '70.36.107.56', platform: 'ECM_APP', previous: { total: 5751, ok: 810, notOk: 4941 }, current: { total: 5751, ok: 810, notOk: 4941 } },
];
