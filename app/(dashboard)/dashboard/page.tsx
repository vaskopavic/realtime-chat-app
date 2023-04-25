import { getServerSession } from "next-auth";

import { authOptions } from "../../lib/auth";

const Dashboard = async ({}) => {
  const session = await getServerSession(authOptions);

  return <pre>Dashboard</pre>;
};

export default Dashboard;
