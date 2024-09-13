// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
  const users = [
    {
      id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
      name: 'Evil Rabbit',
      email: 'evil@rabbit.com',
      password: '123456',
      image_url: '/customers/evil-rabbit.png',
    },
    {
      id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
      name: 'Delba de Oliveira',
      email: 'delba@oliveira.com',
      password: '1234567',
      image_url: '/customers/delba-de-oliveira.png',
    },
    {
      id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
      name: 'Lee Robinson',
      email: 'lee@robinson.com',
      password: '1234568',
      image_url: '/customers/lee-robinson.png',
    },
    {
      id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
      name: 'Michael Novotny',
      email: 'michael@novotny.com',
      password: '1234569',
      image_url: '/customers/michael-novotny.png',
    },
    {
      id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
      name: 'Amy Burns',
      email: 'amy@burns.com',
      password: '12345610',
      image_url: '/customers/amy-burns.png',
    },
    {
      id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
      name: 'Balazs Orban',
      email: 'balazs@orban.com',
      password: '12345611',
      image_url: '/customers/balazs-orban.png',
    },
  ];
  
  const tasks = [
    {
      user_id: users[0].id,
      description: "desc1",
      status: 'pending',
      date: '2022-12-06',
    },
    {
      user_id: users[1].id,
      description: "desc2",
      status: 'pending',
      date: '2022-11-14',
    },
    {
      user_id: users[4].id,
      description: "desc3",
      status: 'finished',
      date: '2022-10-29',
    },
    {
      user_id: users[3].id,
      description: "desc4",
      status: 'finished',
      date: '2023-09-10',
    },
    {
      user_id: users[5].id,
      description: "desc5",
      status: 'pending',
      date: '2023-08-05',
    },
    {
      user_id: users[2].id,
      description: "desc6",
      status: 'pending',
      date: '2023-07-16',
    },
    {
      user_id: users[0].id,
      description: "desc7",
      status: 'pending',
      date: '2023-06-27',
    },
    {
      user_id: users[3].id,
      description: "desc8",
      status: 'finished',
      date: '2023-06-09',
    },
    {
      user_id: users[4].id,
      description: "desc9",
      status: 'finished',
      date: '2023-06-17',
    },
    {
      user_id: users[5].id,
      description: "desc10",
      status: 'finished',
      date: '2023-06-07',
    },
    {
      user_id: users[1].id,
      description: "desc11",
      status: 'finished',
      date: '2023-08-19',
    },
    {
      user_id: users[5].id,
      description: "desc12",
      status: 'finished',
      date: '2023-06-03',
    },
    {
      user_id: users[2].id,
      description: "desc13",
      status: 'finished',
      date: '2022-06-05',
    },
  ];

  
  export { users, tasks};