import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  FormLabel,
  FormControl,
  VStack,
  HStack,
  Button,
  Text,
  IconButton,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Divider,
  Select,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

type Exhibition = {
  location: string;
  startDate: string;
  endDate: string;
};

type Artwork = {
  collection: string;
  images: File[];
  category: string;
};

const AccountPage: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [artistName, setArtistName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [siteWeb, setSiteWeb] = useState("");

  const [address, setAddress] = useState("");
  const [gpsCoords, setGpsCoords] = useState<string | null>(null);

  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);



  // Simuler une conversion adresse → coordonnées GPS
  const mockGeocodeAddress = (address: string) => {
    if (address.trim() === "") return setGpsCoords(null);
    setGpsCoords("48.8566, 2.3522"); // coordonnées de Paris (exemple)
  };

  const handleAddExhibition = () =>
  setExhibitions([...exhibitions, { location: "", startDate: "", endDate: "" }]);

  const handleRemoveExhibition = (index: number) =>
    setExhibitions(exhibitions.filter((_, i) => i !== index));

  const handleExhibitionChange = (
    index: number,
    field: keyof Exhibition,
    value: string
  ) => {
    const updated = [...exhibitions];
    updated[index][field] = value;
    setExhibitions(updated);
  };

  const handleAddArtwork = () =>
    setArtworks([...artworks, { collection: "", category:"", images: [] }]);


  const handleRemoveArtwork = (index: number) =>
    setArtworks(artworks.filter((_, i) => i !== index));

  const handleArtworkCollectionChange = (index: number, value: string) => {
  const updated = [...artworks];
  updated[index].collection = value;
  setArtworks(updated);
};

  const handleArtworkCategoryChange = (index: number, value: string) => {
  const updated = [...artworks];
  updated[index].category = value;
  setArtworks(updated);
};


  const handleArtworkImagesChange = (index: number, files: FileList | null) => {
    if (!files) return;
    const updated = [...artworks];
    updated[index].images = [...updated[index].images, ...Array.from(files)];
    setArtworks(updated);
};

  const handleRemoveImage = (artIndex: number, imgIndex: number) => {
    const updated = [...artworks];
    updated[artIndex].images.splice(imgIndex, 1);
    setArtworks(updated);
};


  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <Box maxW="1000px" mx="auto" p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Mon Compte
      </Text>

      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Profil</Tab>
          <Tab>Œuvres</Tab>
        </TabList>

        <TabPanels>
          {/* --- PROFIL --- */}
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <FormControl>
                <FormLabel>Photo de profil</FormLabel>
                <HStack spacing={4}>
                  <Avatar
                    size="xl"
                    src={photo ? URL.createObjectURL(photo) : undefined}
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setPhoto(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </HStack>
              </FormControl>

              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Nom</FormLabel>
                  <Input value={nom} onChange={(e) => setNom(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Prénom</FormLabel>
                  <Input
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Nom d'artiste</FormLabel>
                <Input
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Contact</FormLabel>
                <Textarea
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Email, téléphone..."
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Un espace ici pour vous présenter, parler de votre vie d'artiste..."
                />
              </FormControl>

              <FormControl>
                <FormLabel>Site Web</FormLabel>
                <Input
                  value={siteWeb}
                  onChange={(e) => setSiteWeb(e.target.value)}
                  placeholder="https://..."
                />
              </FormControl>

              <FormControl>
                <FormLabel>Adresse de vos œuvres</FormLabel>
                <Input
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    mockGeocodeAddress(e.target.value);
                  }}
                  placeholder="Point de localisation sur le globe"
                />
                {gpsCoords && (
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    Coordonnées GPS : {gpsCoords}
                  </Text>
                )}
              </FormControl>

              <Divider />

              <Button colorScheme="teal">Enregistrer le profil</Button>
            </VStack>
          </TabPanel>

          {/* --- ŒUVRES --- */}
          <TabPanel>
            <VStack spacing={6} align="stretch">
              

              <Box>
  <FormLabel>Lieux d'exposition</FormLabel>
  {exhibitions.map((ex, index) => (
    <VStack key={index} spacing={2} align="stretch" mb={2}>
      <Input
        placeholder="Lieu"
        value={ex.location}
        onChange={(e) =>
          handleExhibitionChange(index, "location", e.target.value)
        }
      />
      <HStack>
        <FormControl>
          <FormLabel fontSize="sm">Date de début</FormLabel>
          <Input
            type="date"
            value={ex.startDate}
            onChange={(e) =>
              handleExhibitionChange(index, "startDate", e.target.value)
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="sm">Date de fin</FormLabel>
          <Input
            type="date"
            value={ex.endDate}
            onChange={(e) =>
              handleExhibitionChange(index, "endDate", e.target.value)
            }
          />
        </FormControl>
        <IconButton
          aria-label="Supprimer"
          icon={<DeleteIcon />}
          size="sm"
          mt={6}
          onClick={() => handleRemoveExhibition(index)}
        />

      </HStack>
      <Divider mb={4} />
    </VStack>
    
  ))}
  <Button
    leftIcon={<AddIcon />}
    onClick={handleAddExhibition}
    size="sm"
    mt={2}
  >
    Ajouter un lieu d'exposition
  </Button>
</Box>


              <Divider />

              <Box>
                <FormLabel>Œuvres (par collection)</FormLabel>
                {artworks.map((art, index) => (
                  <VStack key={index} align="stretch" spacing={3} mb={6}>
                    {/* Collection name + Catégorie */}
                    <HStack spacing={2}>
                      <Input
                        placeholder="Nom de la collection"
                        value={art.collection}
                        onChange={(e) =>
                          handleArtworkCollectionChange(index, e.target.value)
                        }
                      />

                      <Select
                        placeholder="Catégorie"
                        value={art.category || ""}
                        onChange={(e) =>
                          handleArtworkCategoryChange(index, e.target.value)
                        }
                      >
                        <optgroup label="Peinture">
                          <option value="huile">Peinture à l'huile</option>
                          <option value="acrylique">Acrylique</option>
                          <option value="aquarelle">Aquarelle</option>
                        </optgroup>

                        <optgroup label="Dessin">
                          <option value="fusain">Fusain</option>
                          <option value="crayon">Crayon</option>
                          <option value="encre">Encre</option>
                        </optgroup>

                        <optgroup label="Sculpture">
                          <option value="bois">Bois</option>
                          <option value="pierre">Pierre</option>
                          <option value="métal">Métal</option>
                        </optgroup>
                      </Select>

                      <IconButton
                        aria-label="Supprimer la collection"
                        icon={<DeleteIcon />}
                        size="sm"
                        onClick={() => handleRemoveArtwork(index)}
                      />
                    </HStack>

                    {/* Affichage des images sélectionnées */}
                    {art.images.length > 0 && (
                      <HStack wrap="wrap" spacing={2}>
                        {art.images.map((img, imgIndex) => (
                          <Box
                            key={imgIndex}
                            position="relative"
                            boxSize="80px"
                            overflow="hidden"
                            borderWidth="1px"
                            borderRadius="md"
                          >
                            <img
                              src={URL.createObjectURL(img)}
                              alt={`img-${imgIndex}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                            <IconButton
                              aria-label="Supprimer image"
                              icon={<DeleteIcon />}
                              size="xs"
                              position="absolute"
                              top="2px"
                              right="2px"
                              onClick={() => handleRemoveImage(index, imgIndex)}
                            />
                          </Box>
                        ))}
                      </HStack>
                    )}

                    {/* Input fichiers multiples */}
                    <Input
                      type="file"
                      multiple
                      onChange={(e) =>
                        handleArtworkImagesChange(index, e.target.files)
                      }
                    />
                  </VStack>
                ))}

                <Button
                  leftIcon={<AddIcon />}
                  onClick={handleAddArtwork}
                  size="sm"
                  mt={2}
                >
                  Ajouter une collection
                </Button>
              </Box>


              <Button colorScheme="teal">Enregistrer les œuvres</Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AccountPage;
