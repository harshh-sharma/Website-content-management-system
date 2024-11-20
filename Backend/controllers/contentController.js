import {Content} from "../models/websiteContentModel.js"

const addContent = async (req, res) => {
  try {
    const { websiteId, type, title, content, metadata } = req.body;

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
      success:false,
      message:error?.message
    })
  }
}

const getDomainSpecificContent = async (req,res) => {
  try {
    const {domainId} = req.params;
    console.log('domainId',domainId);
    
    const domainRelatedContent = await Content.findOne({websiteId:domainId});
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

export {
  addContent,
  getAllContent,
  getDomainSpecificContent
};
