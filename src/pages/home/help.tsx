import Wrapper from '@/layouts/Wrapper';
import Accordion from '@/components/shared/Accordian';
import { useEffect, useState } from 'react';
import Layout from '@/layouts/defaultLayout';

const Help = () => {
  const [expanded, setExpanded] = useState<number>(-1);

  const [clientConfig, setClientConfig] = useState<any>(null);

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem('clientConfig') as string);
    setClientConfig(config);
  }, []);


  const helpData = [
    {
      title: 'How to play the experience?',
      description: (
        <p>
          Once the {clientConfig?.name} app is installed on your phone:
          <ul className="mt-1 list-disc pl-6">
            <li>Provide ‘Camera Access’ for the app to scan the Print</li>
            <li>Point the Camera at your Print</li>
            <li>Place the whole Print in the defined frame given on the camera screen</li>
            <li>Make sure to scan the entire Print</li>
          </ul>
        </p>
      ),
    },
    {
      title: 'My experience is not working',
      description: (
        <p>
          <ul className="mt-1 list-disc pl-6">
            <li>Ensure you have a fast internet connection on your phone</li>
            <li>When scanning your Printplace the Print inside the frame</li>
            <li>
              Place your camera at an appropriate distance to get the right focus for scanning{' '}
            </li>
            <li>Place the photos in a well-lit environment and try to avoid glare/reflections </li>
            <li>Make sure to scan the entire Print</li>
          </ul>
        </p>
      ),
    },
    {
      title: 'Taking too long to load',
      description: <p>Please switch to a Wi-Fi connection for faster loading.</p>,
    },
  ];

  return (
    <Layout>
      <Wrapper title="Help / FAQ" image="/assets/images/help.svg" padding={false}>
        {helpData.map((item: any, index: number) => (
          <Accordion
            key={index}
            id={index}
            title={item.title}
            description={item.description}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        ))}
      </Wrapper>
    </Layout>
  );
};

export default Help;
