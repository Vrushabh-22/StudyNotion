const Category = require("../models/Category");
const { populate } = require("../models/Course");


exports.createCategory = async (req, res) => {
    try {
        //fetch data
        const {name, description} = req.body;

        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are mandetory"
            });
        }

        //saving in DB
        const response = await Category.create({
            name,
            description
        });

        res.status(200).json({
            success:true,
            message:"Category Created"
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to create category"
        });
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            success:true,
            message:"Got all categories",
            categories
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to get all category"
        });
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
            //get categoryId
            const {categoryId} = req.body;

            //get courses for specified categoryId
            const selectedCategory = await Category.findById(categoryId)
                                            .populate({
                                                path:"courses",
                                                populate: {
                                                    path: "ratingAndReviews",
                                                },
                                            })
                                            .populate({
                                                path:"courses",
                                                populate:{
                                                    path:"instructor"
                                                }
                                            })
                                            .exec()
            //validation

            if(!selectedCategory ) {
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found',
                });
            }
            const categoryOtherThanSelected = await Category.find({_id: {$ne: categoryId}})
            
            //get coursesfor different categories
            const differentCategory = await Category.findOne(categoryOtherThanSelected[Math.floor(Math.random() * categoryOtherThanSelected.length)]._id)
                                                    .populate({
                                                        path: "courses",
                                                        match: { status: "Published" },
                                                    })
                                                    .exec()
                                                    

            const allCategories = await Category.find()
                                                .populate({
                                                    path:"courses",
                                                    match: {status : "Published"},
                                                    populate:{
                                                        path:"instructor"
                                                    }
                                                }).exec()

            const allCourses = allCategories.flatMap((category) => category.courses)

            const mostSellingCourses = allCourses
                .sort((a, b) => b.sold - a.sold)
                .slice(0, 10)

            

            return res.status(200).json({
                success:true,
                message:"CatelogPageDetails Found",
                selectedCategory,
                differentCategory,
                mostSellingCourses
                
            });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}