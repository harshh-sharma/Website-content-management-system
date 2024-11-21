import {Content} from "../models/websiteContentModel.js";
import cloudinary from "cloudinary";

const addContent = async (req, res) => {
  try {
    const { websiteId, type, title, content, metadata } = req.body;

    console.log('websiteId, type, title, content',websiteId, type, title, content);
    

    if(!type || !title || !content){
       return res.status(400).json({
        success:false,
        message:"All feilds are required"
       })
    }

    const newContent = new Content({
      websiteId,
      type,
      title,
      content,
      metadata,
    });

    if (req.file) {
      console.log("req", req.file);
      const result = await cloudinary.v2.uploader.upload(req.file.path, {})
      console.log("res", result);
      if (result) {
          newContent.contentImage.public_id = result.public_id;
          newContent.contentImage.secure_url = result.secure_url;
      }
    }


    await newContent.save();

    res.status(201).json({ message: 'Content added successfully', content: newContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding content' });
  }
};

const getAllContent = async (req,res) => {
  try {
    const response = await Content.find({});
    if(!response){
      return res.status(400).json({
        success:false,
        message:"Something went wrong"
      })
    }

    return res.status(200).json({
      success:true,
      message:'successfully get all content',
      contents:response
    })
  } catch (error) {
    return res.status(500).json({
      success:"fffff",
      message:error?.message
    })
  }
}

const getDomainSpecificContent = async (req,res) => {
  try {
    const {domainId} = req.params;
    console.log('domainId',domainId);
    
    const domainRelatedContent = await Content.findOne({websiteId:domainId});
    console.log("domainRelatedContent",domainRelatedContent);
    
    if(!domainRelatedContent){
      return res.status(400).json({
        success:false,
        message:'something went wrong'
      })
    }

    return res.status(200).json({
      success:true,
      message:'Successfully get domain related content',
      domainRelatedContent
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

const updateDomainSpecificContent = async (req,res) => {
  try {
    const {contentId} = req.params;
    console.log('contentId',contentId);
    
    const {title,content} = req.body;

    const response = await Content.updateOne(
      { _id: contentId },
      { title, content }
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Content not found with the provided ID',
      });
    }

    return res.status(200).json({
      success:true,
      message:'Successfully content updated'
    })


  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

const deleteSpecificContent = async (req,res) => {
  try {
    const {contentId} = req.params;
    
    const response = await Content.findByIdAndDelete({_id:contentId});
    
    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'Content not found with the provided ID',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Content deleted successfully',
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export {
  addContent,
  getAllContent,
  getDomainSpecificContent,
  updateDomainSpecificContent,
  deleteSpecificContent
};
