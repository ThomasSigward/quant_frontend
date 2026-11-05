// components/GlobeControls.tsx
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, VStack } from "@chakra-ui/react";

type GlobeControlsProps = {
  pointSize: number;
  setPointSize: (value: number) => void;
  density: number;
  setDensity: (value: number) => void;
};

export const GlobeControls = ({ pointSize, setPointSize, density, setDensity }: GlobeControlsProps) => {
  return (
    <Box position="absolute" top="1rem" left="1rem" bg="whiteAlpha.900" p={4} borderRadius="lg" zIndex={10} shadow="md">
      <VStack spacing={4} align="stretch">
        <Text fontWeight="bold">Taille des points</Text>
        <Slider min={0.001} max={0.05} step={0.001} value={pointSize} onChange={setPointSize}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>

        <Text fontWeight="bold">Densité (inversée)</Text>
        <Slider min={1} max={10} step={0.5} value={density} onChange={setDensity}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </VStack>
    </Box>
  );
};
