/**
 * the parts of web-audio-test-api that the tests use - hand-written because
 * the library ships no types and there is no @types/web-audio-test-api
 */
declare module "web-audio-test-api" {
  type WebAudioTestApi = {
    setState: (apiName: string, state: string) => void;
  };
  const webAudioTestApi: WebAudioTestApi;
  export default webAudioTestApi;

  /** an audio node as web-audio-test-api implements it, with its graph exposed */
  export type TestApiAudioNode = AudioNode & {
    /** input junctions, each fed by the output junctions of upstream nodes */
    $inputs: Array<{ inputs: Array<{ node: TestApiAudioNode }> }>;
  };
  export type TestApiAudioBufferSourceNode = AudioBufferSourceNode &
    TestApiAudioNode & {
      $state: "FINISHED" | "PLAYING" | "SCHEDULED" | "UNSCHEDULED";
    };
  export type TestApiAudioContext = AudioContext & {
    destination: TestApiAudioNode;
    /** advance the context's time, given in seconds */
    $process: (seconds: number) => void;
    /** rewind time to zero and disconnect everything from the destination */
    $reset: () => void;
  };
}
