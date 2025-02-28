import { StoreLocations } from '../../../../../constants/storeLocations';
import { MainHeader } from '../../header';

export function InputGraphOverlayContent() {
  return (
    <div>
      <MainHeader
        text="Input Graph"
        windowName={StoreLocations.INPUT_GRAPH_WINDOW}
      />
      <div>
        Visualize your throttle and brake inputs in real-time with a clear and
        intuitive graph. Perfect for analyzing your driving performance and
        finding areas to improve.
      </div>
      <p>More info will come here shortly.</p>
    </div>
  );
}
