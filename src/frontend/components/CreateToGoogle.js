import { useState } from "react";
import { ethers } from "ethers";
import { Row, Form, Button } from "react-bootstrap";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: "global-tine-266521",
  keyFilename: "../../../global-tine-266521-97d0e20d02aa.json",
});

const bucketName = "your-bucket-name";

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const uploadToGCS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const bucket = storage.bucket(bucketName);
        const blob = bucket.file(file.name);
        const blobStream = blob.createWriteStream();

        blobStream.on("error", (err) => {
          console.log("Error uploading file to Google Cloud Storage:", err);
        });

        blobStream.on("finish", () => {
          console.log(`File ${file.name} uploaded to Google Cloud Storage.`);
          setImage(`https://storage.googleapis.com/${bucketName}/${file.name}`);
        });

        blobStream.end(file.buffer);
      } catch (error) {
        console.log("Error uploading file to Google Cloud Storage:", error);
      }
    }
  };

  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const result = await storage
        .bucket(bucketName)
        .upload(JSON.stringify({ image, price, name, description }));
      const uri = `https://storage.googleapis.com/${bucketName}/${result[0].name}`;
      mintThenList(uri);
    } catch (error) {
      console.log("Error uploading JSON file to Google Cloud Storage:", error);
    }
  };

  const mintThenList = async (uri) => {
    // mint nft
    await (await nft.mint(uri)).wait();
    // get tokenId of new nft
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 mx-auto"
          style={{ maxWidth: "1000px" }}
        >
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToGCS}
              />
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Name"
              />
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                size="lg"
                required
                as="textarea"
                placeholder="Description"
              />
              <Form.Control
                onChange={(e) => setPrice(e.target.value)}
                size="lg"
                required
                type="number"
                placeholder="Price in ETH"
              />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateToGoogle;
