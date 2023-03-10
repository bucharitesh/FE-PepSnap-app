interface AppConfigType {
  site_name: string;
  title: string;
  description: string;
  locale: 'en';
}

export const AppConfig: AppConfigType = {
  site_name: 'Starter',
  title: 'Nextjs Starter',
  description: 'Starter code for your Nextjs Boilerplate with Tailwind CSS',
  locale: 'en',
};

const getClientConfig : any = async (clientName : string) => {
    const res = await fetch(
      `https://config.flamapp.com/zingcam/client?env=prod&config=${clientName}`
    );

    if(res.status === 200) {
      return res.json()
    }
    
    return getClientConfig('default');
};

export default getClientConfig;