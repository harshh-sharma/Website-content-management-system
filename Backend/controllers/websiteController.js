import mongoose from "mongoose";
import { Content } from "../models/websiteContentModel.js";
import { Website } from "../models/websiteModel.js";

const registerWebsite = async (req, res) => {
    try {
      const { name, domain } = req.body;
      
      // Validate input
      if (!name || !domain) {
        return res.status(400).json({ message: 'Name and domain are required' });
      }
  
      // Check if domain already exists
      const existingWebsite = await Website.findOne({ domain });
      if (existingWebsite) {
        return res.status(409).json({ message: 'Domain already exists' });
      }
  
      // Create a new website
      const newWebsite = new Website({
        name,
        domain,
      });
  
      await newWebsite.save();
  
      res.status(201).json({
        message: 'Website added successfully',
        website: newWebsite,
      });
    } catch (error) {
      console.error('Error adding website:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


const getAllWebsitesDomain = async (req,res) => {
  try {
    const response = await Website.find({});
    return res.status(200).json({
      success:true,
      message:"All website domains",
      websiteDomain:response
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Server Error"
    })
  }
}

const getSpecificWebsiteAndThereContents = async (req,res) => {
   try {
    const {domainId} = req.params;

    const response = await Website.findOne({_id:domainId});
    if(!response){
      return res.status(400).json({
        success:false,
        message: 'domain not found with the provided ID',
      })
    }

    const contents = await Content.find({websiteId:domainId});
    console.log('contents',contents);
    

    return res.status(200).json({
      success:true,
      message:'Successfully get domain details',
      domain:response,
      contents
    })
   } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
   }
}

const updateSpecificWebsiteDomainDetails = async (req,res) => {
  try {
    const {domainId} = req.params;
    const {name,domain} = req.body;

    console.log("domainId",domainId);
    console.log("namename",name,domain);
    
    

    if (domain) {
      const existingDomain = await Website.findOne({ domain });

      if (existingDomain && existingDomain._id.toString() !== domainId) {
        return res.status(400).json({
          success: false,
          message: 'Domain is already in use by another website',
        });
      }
    }
    
    const response = await Website.findByIdAndUpdate(
      domainId,
      {name,domain},
      {new:true}
    );

    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'Website not found with the provided ID',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Website domain successfully updated',
      updatedWebsite: response,
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
} 

const deleteWebsiteDomain = async (req,res) => {
  try {
    const { domainId } = req.params;

    // Find the website to ensure it exists
    const website = await Website.findById(domainId);
    if (!website) {
      return res.status(400).json({
        success: false,
        message: 'Website not found with the provided ID',
      });
    }

    // Delete all content related to this website
    await Content.deleteMany({ websiteId: domainId });

    // Delete the website itself
    await Website.findByIdAndDelete(domainId);

    return res.status(200).json({
      success: true,
      message: 'Website domain and associated content successfully deleted',
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

export {
  getAllWebsitesDomain,
  registerWebsite,
  getSpecificWebsiteAndThereContents,
  updateSpecificWebsiteDomainDetails,
  deleteWebsiteDomain
}