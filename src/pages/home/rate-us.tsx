import Button from '@/components/shared/Button';
import Wrapper from '@/layouts/Wrapper';
import { useVuplex } from '@/lib/hooks';
import { LINKS } from '@/lib/utils/constants';
import Layout from '@/layouts/defaultLayout';
import { VUPLEX_EVENTS } from '@/lib/utils/VuplexEvents';

const RateUs = () => {
  const { sendDataToVuplex } = useVuplex();

  return (
    <Layout>
      <Wrapper title="Rate Us" image="/assets/images/rate.svg">
        <>
          <p className="text-2xl font-medium">We’d love your feedback!</p>
          <p className="mt-4 mb-12">
            If you’re enjoying the Zingcam experience, please rate us on the App Store!
          </p>
          <Button
            onClick={() => {
              sendDataToVuplex(VUPLEX_EVENTS.RATE_US, LINKS.ONELINK);
            }}
          >
            Rate Us
          </Button>
        </>
      </Wrapper>
    </Layout>
  );
};

export default RateUs;
