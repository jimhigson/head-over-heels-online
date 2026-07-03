import { TitledCrown } from "./TitledCrown";

export const FiveCrownsDisplay = () => {
  return (
    <>
      <div class="mx-auto w-max">
        <span class="text-double-height text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm3">
          The Blacktooth Empire
        </span>
      </div>
      <div class="mx-auto relative w-0 h-1">
        <TitledCrown
          planet="egyptus"
          label="Egyptus"
          class="w-12 absolute left-m10 top-1 resHandheld:left-m8 resHandheld:top-m1 translate-x-[-50%]"
        />
        <TitledCrown
          planet="penitentiary"
          label="Penitentiary"
          class="w-12 absolute left-10 top-1 resHandheld:left-8 resHandheld:top-m1 translate-x-[-50%]"
        />
        <TitledCrown
          planet="safari"
          label="Safari"
          class="w-12 left-m10 top-14 absolute resHandheld:left-m8 resHandheld:top-8 translate-x-[-50%]"
        />
        <TitledCrown
          planet="bookworld"
          label="Book World"
          class="w-12 absolute left-10 top-14 resHandheld:left-8 resHandheld:top-8 translate-x-[-50%]"
        />
        <TitledCrown
          planet="blacktooth"
          label="Blacktooth"
          class="w-12 absolute left-0 top-8 resHandheld:left-0 ml-[-50%] resHandheld:top-3 translate-x-[-50%]"
        />
      </div>
    </>
  );
};
